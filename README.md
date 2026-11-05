# Ignacio Pulgar · StrengthLab

Web pública sin registro: https://renzo-bello.github.io/ignacio-pulgar-strengthlab/

Cuatro días y 18 ejercicios con fotografías. Registro de kg/repeticiones y series completadas, progreso, historial, copias JSON y reportes semanales PDF/CSV. Programa de ocho semanas, con fecha de inicio editable en Reporte.

Los registros se guardan solo en el navegador del usuario. No se envían a GitHub ni hay cuentas, servidor o base compartida. Para enviarlos al entrenador: Generar reporte → Compartir PDF. Si el navegador no permite compartir archivos, el PDF se descarga para adjuntarlo manualmente en WhatsApp.

GitHub Pages publica desde main, carpeta raíz. No requiere instalación ni compilación. El index usa rutas relativas para funcionar bajo la URL del repositorio.

Diseño adaptado del proyecto de Lukas Gaete. Imágenes nuevas: generadas con IA; ver IMAGES.md. Los archivos fotográficos anteriores mantienen su atribución en IMAGE-LICENSE.md. Los archivos vendor incluyen sus avisos de licencia.

## RIR pautado y RIR real

«Editar pauta» permite definir un RIR objetivo para cada serie y un video referencial por ejercicio. No hay objetivos inventados: todos comienzan sin pautar. Valores disponibles: 5+, 5, 4, 3, 2, 1, 0 y F. F representa fallo; 0, ninguna repetición en reserva sin intentar otra.

«Guardar pauta» guarda los ajustes en ese navegador. «Crear enlace para Ignacio» incluye la pauta completa en el enlace; el destinatario debe abrirlo para recibirla. No hay sincronización automática entre dispositivos ni autenticación del editor. También se pueden descargar e importar pautas JSON. Las sesiones que ya tienen registros conservan el objetivo original, mientras las nuevas usan la pauta vigente.

El atleta registra RIR real por serie. El PDF y ambos CSV incluyen RIR pautado y RIR real. Las copias de registros anteriores, que no tenían RIR, siguen siendo válidas y muestran los campos vacíos.

Los videos aceptan enlaces HTTP/HTTPS y se abren en otra pestaña. Las nuevas imágenes de referencia se generan con IA y se identifican como tales en el detalle. No se incluyen datos de pruebas en el repositorio.
