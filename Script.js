document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggleSidebar');
  const openBtn = document.getElementById('openSidebar');
  const sidebar = document.getElementById('sidebar');
  const body = document.body;

  if (toggleBtn && openBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('collapsed');
      openBtn.style.display = 'block';
      body.classList.add('sidebar-closed');
    });

    openBtn.addEventListener('click', () => {
      sidebar.classList.remove('collapsed');
      openBtn.style.display = 'none';
      body.classList.remove('sidebar-closed');
    });
  }

  // Buscadores dinámicos para cada tabla
  const buscadores = [
    { input: 'filtroCuotas', tabla: '#cuotas tbody tr' },
    { input: 'filtroClientes', tabla: '#clientes tbody tr' },
    { input: 'filtroProductos', tabla: '#productos tbody tr' }
  ];

  buscadores.forEach(({ input, tabla }) => {
    const el = document.getElementById(input);
    if (el) {
      el.addEventListener('input', function () {
        const valor = this.value.toLowerCase();
        document.querySelectorAll(tabla).forEach(row => {
          row.style.display = row.textContent.toLowerCase().includes(valor) ? '' : 'none';
        });
      });
    }
  });
});

// Función para exportar cualquier tabla como CSV
function exportarCSV(seccionID) {
  const filas = document.querySelectorAll(`#${seccionID} table tr`);
  const csv = [...filas].map(row =>
    [...row.children].map(cell => `"${cell.innerText.trim()}"`).join(',')
  ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${seccionID}.csv`;
  link.click();
}
