import { useEffect, useState } from 'react';
import useAuthStore from '../store/useAuthStore';
import useGuestbookStore from '../store/useGuestbookStore';
import { guestbookList, guestbookInsert, guestbookUpdate, guestbookDelete } from '../api/Guestbook';

export default function GuestbookPage() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const user = useAuthStore((state) => state.user)
    const { guestbooks, setGuestbooks, removeGuestbook, updateGuestbook } = useGuestbookStore()

    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [editId, setEditId] = useState(null)
    const [editSubject, setEditSubject] = useState('')
    const [editContent, setEditContent] = useState('')

    const fetchList = async () => {
        try {
            const res = await guestbookList()
            if (res.data.success && res.data.data) {
                setGuestbooks(res.data.data)
            } else {
                setGuestbooks([])
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    const handleAdd = async () => {
        if (!subject.trim() || !content.trim()) return
        setLoading(true)
        setError('')
        try {
            await guestbookInsert({
                g_writer: user.m_name,
                g_subject: subject,
                g_content: content,
                g_email: user.m_email || '',
                g_pwd: ''
            })
            setSubject('')
            setContent('')
            await fetchList()
        } catch (e) {
            setError('등록에 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (g_idx) => {
        try {
            await guestbookDelete(g_idx)
            removeGuestbook(g_idx)
        } catch (e) {
            console.error(e)
        }
    }

    const handleEditStart = (g) => {
        setEditId(g.g_idx)
        setEditSubject(g.g_subject)
        setEditContent(g.g_content)
    }

    const handleEditSave = async () => {
        try {
            await guestbookUpdate({
                g_idx: editId,
                g_subject: editSubject,
                g_content: editContent,
                g_writer: user.m_name
            })
            updateGuestbook(editId, { g_subject: editSubject, g_content: editContent })
            setEditId(null)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='page' style={{ maxWidth: '600px' }}>
            <h2 style={{ marginBottom: '24px' }}>방명록</h2>

            {isLoggedIn ? (
                <div className='card col' style={{ padding: '20px', gap: '10px', marginBottom: '28px' }}>
                    <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder='제목'
                    />
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder='내용을 입력하세요'
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                    {error && <p className='muted'>{error}</p>}
                    <button
                        onClick={handleAdd}
                        disabled={loading}
                        style={{ alignSelf: 'flex-end', width: '80px' }}
                    >
                        {loading ? '...' : '등록'}
                    </button>
                </div>
            ) : (
                <p className='muted' style={{ marginBottom: '24px' }}>
                    로그인하면 글을 작성할 수 있습니다.
                </p>
            )}

            <div className='col'>
                {guestbooks.length === 0 && <p className='empty'>방명록이 비어있습니다</p>}
                {guestbooks.map((g) => (
                    <div key={g.g_idx} className='card' style={{ padding: '16px 20px', borderRadius: '10px' }}>
                        {editId === g.g_idx ? (
                            <div className='col' style={{ gap: '8px' }}>
                                <input
                                    value={editSubject}
                                    onChange={(e) => setEditSubject(e.target.value)}
                                />
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={3}
                                    style={{ resize: 'vertical' }}
                                />
                                <div className='row'>
                                    <button onClick={handleEditSave}>저장</button>
                                    <button className='ghost' onClick={() => setEditId(null)}>취소</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{g.g_subject}</p>
                                <p className='muted' style={{ fontSize: '13px', marginBottom: '8px' }}>{g.g_content}</p>
                                <p style={{ color: '#334155', fontSize: '11px', marginBottom: '10px' }}>
                                    {g.g_writer} · {g.g_regdate}
                                </p>
                                {isLoggedIn && user?.m_name === g.g_writer && (
                                    <div className='row'>
                                        <button className='ghost sm' onClick={() => handleEditStart(g)}>수정</button>
                                        <button className='danger sm' onClick={() => handleDelete(g.g_idx)}>삭제</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
