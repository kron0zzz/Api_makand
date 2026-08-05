import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // false para puerto 587 (TLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRecoveryEmail = async (userEmail, code) => {
  const mailOptions = {
    from: `"Soporte MakandSMR" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Código de Recuperación de Contraseña - MakandSMR",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #f97316;">Solicitud de Recuperación de Contraseña</h2>
        <p>Hola,</p>
        <p>Has solicitado restablecer tu contraseña en el sistema MakandSMR. Tu código de verificación es:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="background-color: #f97316; color: white; padding: 12px 24px; font-weight: bold; font-size: 24px; border-radius: 5px; letter-spacing: 2px;">${code}</span>
        </div>
        <p>Ingresa este código en la aplicación para continuar con el cambio de contraseña.</p>
        <p>Si no solicitaste este cambio, puedes ignorar este mensaje de forma segura.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #777;">Este código expirará en 15 minutos por seguridad.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};