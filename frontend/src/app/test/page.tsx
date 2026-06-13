export default function TestPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slateLight">
            <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md">
                <h1 className="text-2xl font-bold font-serif mb-4 text-charcoal">Test Vocacional</h1>
                <p className="text-gray-500 text-sm mb-6">
                    Esta sección está en desarrollo. Pronto podrás responder al test vocacional de UTP Orienta.
                </p>
                <a href="/" className="inline-flex bg-utpRed hover:bg-utpDarkRed text-white text-xs font-bold px-6 py-3 rounded-full transition-colors cursor-pointer">
                    Volver al Inicio
                </a>
            </div>
        </div>
    );
}
