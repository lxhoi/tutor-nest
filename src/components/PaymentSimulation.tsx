import { useState } from 'react';
import { Button } from './ui/button';

type Failure = 'declined' | 'offline' | 'timeout';
const messages: Record<Failure, { title: string; detail: string; action: string }> = {
 declined: {title:'Phương thức thanh toán không được chấp nhận (demo).',detail:'Chưa xác nhận lịch học. Giữ nguyên lựa chọn; bạn có thể đóng để chọn phương thức khác hoặc thử lại trong demo.',action:'Thử lại trong demo'},
 offline: {title:'Mất kết nối trước khi gửi (demo).',detail:'Yêu cầu chưa được gửi. Lịch chưa xác nhận; lựa chọn đặt lịch vẫn giữ nguyên.',action:'Mô phỏng kết nối lại'},
 timeout: {title:'Chưa nhận được kết quả thanh toán (demo).',detail:'Chưa xác định giao dịch thành công hay thất bại. Lịch chưa xác nhận. Kiểm tra trạng thái trước khi gửi lại để tránh thanh toán trùng.',action:'Kiểm tra trạng thái (demo)'},
};
export function PaymentSimulation({ onConfirmed }: { onConfirmed: () => void }) {
 const [state,setState]=useState<'idle'|'pending'|'failed'>('idle');
 const [failure,setFailure]=useState<Failure>('declined');
 return <div className="space-y-3"><p className="text-xs text-neutral-600">Chế độ mô phỏng: không chuyển tiền thật hoặc kết nối ngân hàng.</p>
 {state==='idle'&&<Button variant="legacy" onClick={()=>setState('pending')} className="w-full rounded-xl bg-emerald-700 text-white p-3 text-xs font-bold">Mô phỏng gửi thanh toán</Button>}
 {state==='pending'&&<><p role="status" className="text-xs text-amber-900">Đang chờ kết quả (mô phỏng). Lịch học chưa được xác nhận. Không gửi lại khi chưa rõ trạng thái.</p><Button variant="legacy" onClick={onConfirmed} className="w-full rounded-xl bg-emerald-700 text-white p-3 text-xs font-bold">Mô phỏng đối soát thành công</Button><fieldset className="border rounded-xl p-3 space-y-2"><legend className="text-xs font-bold">Công cụ kiểm tra lỗi · demo</legend><label className="block text-xs">Tình huống<select aria-label="Tình huống lỗi thanh toán demo" className="block w-full min-h-11 border rounded-lg bg-white text-neutral-900 px-2 mt-1" value={failure} onChange={e=>setFailure(e.target.value as Failure)}><option value="declined">Phương thức bị từ chối</option><option value="offline">Mất kết nối trước khi gửi</option><option value="timeout">Quá thời gian chờ kết quả</option></select></label><Button variant="legacy" onClick={()=>setState('failed')} className="w-full rounded-xl border border-rose-300 p-3 text-xs font-bold text-rose-800">Mô phỏng lỗi đã chọn</Button></fieldset></>}
 {state==='failed'&&<><div role="alert" className="text-xs text-rose-800 space-y-2"><p className="font-bold">{messages[failure].title}</p><p>{messages[failure].detail}</p></div><Button variant="legacy" onClick={()=>setState(failure==='timeout'?'pending':'idle')} className="w-full rounded-xl border p-3 text-xs font-bold text-neutral-800">{messages[failure].action}</Button></>}
 </div>;
}
