import React from 'react';
import { Trash2, Download, X } from 'lucide-react';

const QuotationHistoryModal = ({
  isOpen,
  onClose,
  quotations,
  onDelete,
  onDownload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">Saved Quotations</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto flex-grow">
          {quotations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No saved quotations found.</p>
          ) : (
            <ul className="space-y-3">
              {quotations.map((quote) => (
                <li key={quote._id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-700">
                      Quotation from {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {quote.items.length} items - Total: ${quote.grandTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDownload(quote)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                      title="Download PDF"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(quote._id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotationHistoryModal;