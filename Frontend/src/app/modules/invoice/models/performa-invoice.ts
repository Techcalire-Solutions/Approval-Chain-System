import { PerformaInvoiceStatus } from "./performa-invoice-status";

export interface PerformaInvoice {
  id: number;
  piNo: string;
  url: string;
  status: string;
  bankSlip: string;
  performaInvoiceStatuses: PerformaInvoiceStatus[]
}
