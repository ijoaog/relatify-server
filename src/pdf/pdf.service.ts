import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

// Definindo a interface para o detento
interface Detainee {
  fullName: string;
  cpf: string;
  birthDate: string;
  caseNumber: string;
  monitoringStatus: string;
}

// Definindo a interface para os relatórios
interface DetaineeReport {
  detainee: Detainee;
  id: string;
  deviceSerial: string;
  installDate: string;
  removalDate?: string; // Pode ser opcional
  status: string;
  location: string;
  lastViolation?: string; // Pode ser opcional
  alerts?: string; // Pode ser opcional
  notes: string;
}

@Injectable()
export class PdfService {
  async createPdf(data: DetaineeReport[]): Promise<Buffer> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Agrupar os dados por detento
    const detaineeReports = data.reduce(
      (acc, detainee) => {
        const fullName = detainee.detainee.fullName;
        if (!acc[fullName]) {
          acc[fullName] = [];
        }
        acc[fullName].push(detainee);
        return acc;
      },
      {} as Record<string, DetaineeReport[]>,
    );

    // Criar HTML dinâmico a partir do objeto JSON
    const htmlContent = `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        line-height: 1.6;
        color: #333;
      }
      h1 {
        color: #0056b3;
        text-align: center;
        font-size: 28px;
        margin-bottom: 20px;
      }
      h2 {
        color: #333;
        font-size: 24px;
        margin-top: 20px;
        margin-bottom: 5px; /* Menos espaço abaixo do h2 */
      }
      h3 {
        font-size: 20px;
        color: #0056b3;
        margin-bottom: 5px; /* Menos espaço abaixo do h3 */
      }
      .introduction {
        margin-bottom: 10px; /* Menos espaço na introdução */
        font-size: 16px;
        text-align: justify;
      }
      .detainee {
        margin: 15px 0; /* Espaço ainda menor entre detentos */
        padding: 10px; /* Espaço menor dentro do detento */
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        page-break-inside: avoid; /* Evita quebra de página dentro do detento */
      }
      .report {
        margin: 2px 0; /* Espaço menor entre relatórios */
        padding: 5px; /* Espaço menor dentro do relatório */
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        border-radius: 5px;
        page-break-inside: avoid; /* Evita quebra de página dentro do relatório */
      }
      strong {
        color: #000;
      }
      .footer-image {
        display: flex;
        justify-content: center; /* Centraliza a imagem */
        margin-top: 30px; /* Espaço acima da imagem */
      }
      @media print {
        body {
          margin: 0;
        }
        .footer-image {
          margin-top: 0; /* Remove o espaço superior em impressão */
        }
      }
    </style>
  </head>
  <body>
    <header>
      <h1>Relatórios de Monitoramento</h1>
    </header>
    <div class="introduction">
      <p>Este documento apresenta os relatórios de monitoramento de detentos. Cada seção inclui detalhes relevantes sobre o status e a localização dos detentos, além de informações sobre qualquer violação ou alerta que possa ter sido gerado durante o período de monitoramento.</p>
    </div>
    <div class="footer-image">
      <img src="https://www.aen.pr.gov.br/sites/default/arquivos_restritos/files/imagem/migrados/galeria/55897/logo1.jpg" alt="Imagem do relatório" style="max-width: 100%; height: auto;" />
    </div>
    ${Object.entries(detaineeReports)
      .map(
        ([fullName, reports]) => `
          <div class="detainee">
            <h2>${fullName}</h2>
            ${reports
              .map(
                (report) => `
                  <div class="report">
                    <h3>Detalhes do Relatório</h3>
                    <p><strong>ID:</strong> ${report.id}</p>
                    <p><strong>Data de Instalação:</strong> ${report.installDate}</p>
                    <p><strong>Data de Remoção:</strong> ${report.removalDate ? report.removalDate : 'Ainda instalado'}</p>
                    <p><strong>Status:</strong> ${report.status}</p>
                    <p><strong>Localização:</strong> ${report.location}</p>
                    <p><strong>Última Violação:</strong> ${report.lastViolation ? report.lastViolation : 'Nenhuma'}</p>
                    <p><strong>Alertas:</strong> ${report.alerts ? report.alerts : 'Nenhum'}</p>
                    <p><strong>Notas:</strong> ${report.notes}</p>
                  </div>
                `,
              )
              .join('')}
          </div>
        `,
      )
      .join('')}
    <footer>
      <p style="text-align: center; margin-top: 20px;">© ${new Date().getFullYear()} - Todos os direitos reservados.</p>
    </footer>
  </body>
</html>
`;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Gere o PDF e converta para Buffer
    const pdfBuffer = Buffer.from(
      await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      }),
    );

    await browser.close();
    return pdfBuffer;
  }
}
