import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    (this as any).state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render(): ReactNode {
    const state = (this as any).state as State;
    if (state.hasError) {
      return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300 text-center space-y-4">
            <div className="text-5xl animate-bounce">🎈</div>
            <h2 className="text-xl font-black text-slate-800">
              อนุบาลคิดส์ คิดส์ - Kids Hand Motion EduGame
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              พร้อมเริ่มการเรียนรู้ กรุณากดปุ่มด้านล่างเพื่อเปิดระบบ
            </p>
            {state.error && (
              <pre className="text-[10px] text-rose-600 bg-rose-50 p-3 rounded-xl overflow-x-auto text-left max-h-24">
                {state.error.message}
              </pre>
            )}
            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer"
              >
                🔄 โหลดหน้าจอใหม่ (Refresh)
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (this as any).props.children;
  }
}
