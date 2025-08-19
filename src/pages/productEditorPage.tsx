import { Stage, Layer, Rect } from 'react-konva';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Undo, Redo, Eraser, Save, PaintBucket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const GRID_WIDTH = 24;
const GRID_HEIGHT = 20;
const CELL_SIZE = 20;

export default function ProductEditorPage() {
  const { t } = useTranslation();
  const [activeColor, setActiveColor] = useState('#FF8C42');
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill('#ffffff'))
  );
  const [history, setHistory] = useState([JSON.stringify(grid)]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [message, setMessage] = useState('');

  const updateGrid = (newGrid: string[][]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(JSON.stringify(newGrid));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setGrid(newGrid);
  };

  const handleClick = (row: number, col: number) => {
    const newGrid = grid.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? activeColor : cell
      )
    );
    updateGrid(newGrid);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setGrid(JSON.parse(history[newIndex]));
      setHistoryIndex(newIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setGrid(JSON.parse(history[newIndex]));
      setHistoryIndex(newIndex);
    }
  };

  const handleClear = () => {
    const cleared = Array.from({ length: GRID_HEIGHT }, () =>
      Array(GRID_WIDTH).fill('#ffffff')
    );
    updateGrid(cleared);
  };

  const handleSave = () => {
    const design = {
      id: uuidv4(),
      grid,
      message,
      createdAt: new Date().toISOString(),
    };
    console.log(t('design.savedLog'), design);
    alert(t('design.savedAlert'));
  };

  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="bg-gradient-to-br from-sunset to-berry py-12 px-4 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4">{t('editor.title')}</h1>
        <p className="text-lg max-w-2xl mx-auto">{t('editor.subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        
<section className="bg-white rounded-lg shadow p-6">
  <h2 className="text-xl font-semibold mb-4">{t('editor.customMessage')}</h2>
  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder={t('editor.messagePlaceholder')}
    className="w-full h-28 p-3 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-sunset"
  ></textarea>

  <div className="mt-4 flex justify-end">
    <button
      onClick={handleSave}
      className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center gap-2"
    >
      <Save size={20} /> {t('editor.saveButton')}
    </button>
  </div>
</section>


        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6 text-center">{t('editor.drawTitle')}</h2>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <div className="flex gap-2 items-center">
              <PaintBucket size={24} />
              <input
                type="color"
                value={activeColor}
                onChange={(e) => setActiveColor(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleUndo} className="bg-sunset text-white px-3 py-2 rounded-full hover:bg-berry transition"><Undo size={20} /></button>
              <button onClick={handleRedo} className="bg-sunset text-white px-3 py-2 rounded-full hover:bg-berry transition"><Redo size={20} /></button>
              <button onClick={handleClear} className="bg-red-500 text-white px-3 py-2 rounded-full hover:bg-red-600 transition"><Eraser size={20} /></button>
              <button onClick={handleSave} className="bg-green-500 text-white px-3 py-2 rounded-full hover:bg-green-600 transition"><Save size={20} /></button>
            </div>
          </div>

          <div className="flex justify-center overflow-auto border shadow-md rounded-lg bg-gray-50 p-2">
            <Stage width={GRID_WIDTH * CELL_SIZE} height={GRID_HEIGHT * CELL_SIZE}>
              <Layer>
                {grid.map((row, rowIndex) =>
                  row.map((color, colIndex) => (
                    <Rect
                      key={`${rowIndex}-${colIndex}`}
                      x={colIndex * CELL_SIZE}
                      y={rowIndex * CELL_SIZE}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      fill={color}
                      stroke="#ccc"
                      onClick={() => handleClick(rowIndex, colIndex)}
                    />
                  ))
                )}
              </Layer>
            </Stage>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">{t('editor.examplesTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white border border-sunset rounded-lg shadow hover:shadow-lg transition">
              <img
                src="/images/pattern-chevron.png"
                alt={t('editor.exampleChevron')}
                className="w-full h-48 object-contain rounded-t-lg bg-gray-100"
              />
              <div className="p-4 text-center">
                <p className="font-bold">{t('editor.exampleChevron')}</p>
              </div>
            </div>
            <div className="bg-white border border-sunset rounded-lg shadow hover:shadow-lg transition">
              <img
                src="/images/pattern-m.png"
                alt={t('editor.exampleLetterM')}
                className="w-full h-48 object-contain rounded-t-lg bg-gray-100"
              />
              <div className="p-4 text-center">
                <p className="font-bold">{t('editor.exampleLetterM')}</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
