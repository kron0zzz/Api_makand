const errorMiddleware = (err, req, res, next) => {
  console.error("Error capturado por middleware:", err);

  if (res.headersSent) {
    return next(err);
  }

  const pgErrorMessages = {
    '23503': 'No se pudo completar la operación porque el registro está asociado a otros datos. Verifica que no haya información relacionada antes de eliminar.',
    '23505': 'Ya existe un registro con este valor. Por favor, utiliza un valor diferente.',
    '23502': 'Faltan campos obligatorios. Completa toda la información requerida.',
    '23514': 'Los datos no cumplen con una restricción de validación. Revisa la información ingresada.',
    '22001': 'Uno de los valores ingresados es demasiado largo. Reduce el texto e intenta nuevamente.',
    '22023': 'El tipo de dato ingresado no es válido. Corrige la información y vuelve a intentarlo.',
    'P2025': 'El registro que intentas modificar o eliminar no existe.',
  };

  if (err.code && pgErrorMessages[err.code]) {
    return res.status(400).json({ error: pgErrorMessages[err.code] });
  }

  if (err.message && !err.message.includes('violates') && !err.message.includes('constraint')) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({ error: 'Error interno del servidor. Por favor, intenta nuevamente más tarde.' });
};

export default errorMiddleware;
