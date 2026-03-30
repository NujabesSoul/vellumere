// The Notebook Page — Leonardo's container.
// Everything lives on parchment. The page IS the interface.
// No chrome. No sidebars. Just a scholar's notebook, somehow alive.

export default function NotebookPage({ children }) {
  return (
    <div className="notebook-page">
      {/* Decorative corner flourishes — because Leonardo never left a corner empty */}
      <div className="page-corner page-corner-tl">❧</div>
      <div className="page-corner page-corner-tr">❧</div>
      <div className="page-corner page-corner-bl">❧</div>
      <div className="page-corner page-corner-br">❧</div>

      <div className="page-content">
        {children}
      </div>
    </div>
  )
}
