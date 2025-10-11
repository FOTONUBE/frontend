"use client";

interface MpLinkModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const MpLinkModal = ({ onConfirm, onCancel }: MpLinkModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-cyan-600">Importante</h2>
        <p className="mb-6 text-gray-700">
          Luego de la vinculación exitosa deberás volver a iniciar sesión en
          FotoNube.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-cyan-600 text-white hover:bg-cyan-700 transition"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MpLinkModal;
