export default function Pagination({ pageNumber, totalPages, onChange }) {
  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button disabled={pageNumber === 1} onClick={() => onChange(pageNumber - 1)}>Anterior</button>
      {numbers.map((n) => (
        <button key={n} className={pageNumber === n ? 'current' : ''} onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
      <button disabled={pageNumber === totalPages} onClick={() => onChange(pageNumber + 1)}>Siguiente</button>
    </div>
  );
}
