function formatoMoneda(numero) {
    return numero.toLocaleString('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace("€", "") + "€";
  }