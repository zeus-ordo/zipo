import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from '../components/Layout';
import { orderDraftApi, orderApi } from '../api/client';
import { formatDate } from '../utils/date';
import { AlertTriangle, Check, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function OrderDraftDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirming, setConfirming] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientPhone: '',
    recipientAddress: '',
    deliveryMethod: '',
    paymentMethod: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['order-draft', id],
    queryFn: () => orderDraftApi.get(id!),
    enabled: !!id,
  });

  const draft = data?.data;

  useEffect(() => {
    console.log('[OrderDraftDetail] draft:', JSON.stringify(draft, null, 2));
    if (draft?.customer) {
      console.log('[OrderDraftDetail] customer:', JSON.stringify(draft.customer, null, 2));
      setFormData(prev => ({
        ...prev,
        recipientName: draft.customer?.name || prev.recipientName,
        recipientPhone: draft.customer?.phone || prev.recipientPhone,
        recipientAddress: draft.customer?.address || prev.recipientAddress,
      }));
    }
  }, [draft]);

  const confirmMutation = useMutation({
    mutationFn: (data: { recipientName: string; recipientPhone: string; recipientAddress: string; deliveryMethod: string; paymentMethod: string }) =>
      orderDraftApi.confirm(id!, data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['order-drafts'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate(`/orders/${res.data.id}`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.error || '確認失敗');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => orderDraftApi.delete(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['order-drafts'] });
      navigate('/order-drafts');
    },
  });

  const handleConfirm = async () => {
    if (!formData.recipientName || !formData.recipientPhone || !formData.recipientAddress) {
      toast.error('請填寫收件人姓名、電話、地址');
      return;
    }
    confirmMutation.mutate({
      recipientName: formData.recipientName,
      recipientPhone: formData.recipientPhone,
      recipientAddress: formData.recipientAddress,
      deliveryMethod: formData.deliveryMethod,
      paymentMethod: formData.paymentMethod,
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12 text-gray-500">載入中...</div>
      </Layout>
    );
  }

  if (!draft) {
    return (
      <Layout>
        <div className="text-center py-12 text-gray-500">草稿不存在</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">訂單草稿</h1>
        <p className="text-sm text-gray-500 mt-1">
          {draft.customer?.lineDisplayName} · {formatDate(draft.createdAt)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">商品項目</h2>
          {draft.items?.length === 0 ? (
            <p className="text-gray-500">無商品項目</p>
          ) : (
            <div className="space-y-3">
              {draft.items?.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  {item.isFuzzy && (
                    <div className="flex items-center gap-1 text-yellow-600 text-sm mb-2">
                      <AlertTriangle size={14} />
                      模糊商品
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">商品名稱</span>
                      <p className="font-medium">{item.name || item.rawText}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">顏色/尺寸</span>
                      <p className="font-medium">{item.color || '-'} / {item.size || '-'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">數量</span>
                      <p className="font-medium">{item.quantity || '-'}</p>
                    </div>
                  </div>
                  {item.fuzzyReason && (
                    <p className="text-xs text-gray-500 mt-2">原因: {item.fuzzyReason}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-800 mb-2">LLM 摘要</h3>
            <p className="text-sm text-gray-600">{draft.summaryForStaff || '無'}</p>
            {draft.replySuggestion && (
              <>
                <h3 className="font-medium text-gray-800 mt-4 mb-2">建議回覆</h3>
                <p className="text-sm text-gray-600">{draft.replySuggestion}</p>
              </>
            )}
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">收件與付款資訊</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">收件人姓名 *</label>
              <input
                type="text"
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">收件人電話 *</label>
              <input
                type="text"
                value={formData.recipientPhone}
                onChange={(e) => setFormData({ ...formData, recipientPhone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">收件地址 *</label>
              <input
                type="text"
                value={formData.recipientAddress}
                onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">配送方式</label>
              <select
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">請選擇</option>
                <option value="home_delivery">宅配</option>
                <option value="store_pickup">超商取貨</option>
                <option value="meet_up">面交</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">付款方式</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">請選擇</option>
                <option value="bank_transfer">匯款</option>
                <option value="cash_on_delivery">貨到付款</option>
                <option value="line_pay">LINE Pay</option>
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleConfirm}
              disabled={confirmMutation.isPending}
              className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Check size={20} />
              {confirmMutation.isPending ? '確認中...' : '確認並建立訂單'}
            </button>
            <button
              onClick={() => {
                if (confirm('確定要刪除這個草稿嗎？')) {
                  deleteMutation.mutate();
                }
              }}
              disabled={deleteMutation.isPending}
              className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              刪除草稿
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}