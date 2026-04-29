<div style={{ padding: '20px' }}>
    <h1>CSS & Tailwind Debug Panel</h1>

    <section style={{ marginTop: '20px' }}>
        <h2>✅ If all below look correct, CSS is working properly:</h2>

        {/* Tailwind Color Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Tailwind Colors:</h3>
            <div className="grid grid-cols-5 gap-2">
                <div className="bg-red-500 p-4 text-white">Red</div>
                <div className="bg-blue-500 p-4 text-white">Blue</div>
                <div className="bg-green-500 p-4 text-white">Green</div>
                <div className="bg-yellow-500 p-4 text-black">Yellow</div>
                <div className="bg-purple-500 p-4 text-white">Purple</div>
            </div>
        </div>

        {/* Responsive Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Responsive Classes (resize window):</h3>
            <div className="hidden md:block lg:hidden bg-blue-300 p-4">
                🟦 Shows on md-lg screens only (768px-1024px)
            </div>
            <div className="block lg:hidden bg-green-300 p-4">
                🟩 Shows on all screens (hidden on lg+)
            </div>
            <div className="hidden lg:block bg-purple-300 p-4">
                🟪 Shows on lg+ screens only (1024px+)
            </div>
        </div>

        {/* Hover Effects Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Hover Effects:</h3>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">
                Hover me! (should darken)
            </button>
            <div className="mt-2 p-4 bg-gray-100 hover:bg-gray-300 transition-colors cursor-pointer">
                Hover this box (should change color)
            </div>
        </div>

        {/* Shadow & Border Tests */}
        <div style={{ marginTop: '20px' }}>
            <h3>Shadows & Borders:</h3>
            <div className="grid grid-cols-3 gap-4">
                <div className="shadow p-4 bg-white">Shadow</div>
                <div className="shadow-lg p-4 bg-white">Shadow-lg</div>
                <div className="shadow-2xl p-4 bg-white">Shadow-2xl</div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border p-4">Border</div>
                <div className="border-2 border-blue-500 p-4">Border-2 Blue</div>
                <div className="border-4 border-red-500 p-4">Border-4 Red</div>
            </div>
        </div>

        {/* Spacing Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Spacing (Margin & Padding):</h3>
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-blue-200 p-2">p-2</div>
                <div className="bg-blue-300 p-4">p-4</div>
                <div className="bg-blue-400 p-6">p-6</div>
                <div className="bg-blue-500 p-8 text-white">p-8</div>
            </div>
        </div>

        {/* Text Styling Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Text Styling:</h3>
            <p className="text-xs">This is xs text</p>
            <p className="text-sm">This is sm text</p>
            <p className="text-base">This is base text</p>
            <p className="text-lg font-bold">This is lg bold text</p>
            <p className="text-2xl font-extrabold">This is 2xl extrabold text</p>
        </div>

        {/* Flexbox Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Flexbox:</h3>
            <div className="flex gap-4">
                <div className="flex-1 bg-blue-200 p-4 text-center">Flex 1</div>
                <div className="flex-1 bg-blue-300 p-4 text-center">Flex 1</div>
                <div className="flex-1 bg-blue-400 p-4 text-center">Flex 1</div>
            </div>
        </div>

        {/* Grid Test */}
        <div style={{ marginTop: '20px' }}>
            <h3>Grid:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-purple-300 p-4 text-center">Item {i}</div>
                ))}
            </div>
        </div>
    </section>

    {/* Debug Info */}
    <section style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0' }}>
        <h3>Debug Information:</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
            {`Loaded Stylesheets: ${document.styleSheets.length}
CSS Rules: ${Array.from(document.styleSheets).reduce((sum, sheet) => {
                try {
                    return sum + (sheet.cssRules?.length || 0);
                } catch {
                    return sum;
                }
            }, 0)}

Tailwind Status:
${document.body.className.includes('antialiased') ? '✅ Tailwind CSS loaded (antialiased class found)' : '❌ Tailwind CSS may not be loaded'}

Check Console (F12) for any CSS errors.
`}
        </pre>
    </section>
</div>
