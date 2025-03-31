// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import useGeneral from "@/domain/store/general.store";
// import { cn } from "@/lib/utils";


// interface IModalContentProps {
//   children: React.ReactNode;
//   className?: string;
//   customOpen?: boolean
// }

// export const ModalContent = ({ children, className, customOpen = false }: IModalContentProps) => {
//   // hooks
//   const modalStatus = useGeneral(s => s.modalStatus);
//   const setModalStatus = useGeneral(s => s.setModalStatus);
  
//   return (
//     <Dialog onOpenChange={open => { if(!open) { setModalStatus() } }} open={Boolean(modalStatus) || customOpen}>
//       <DialogContent className={cn(className, 'max-w-7xl')}>
//         {children}
//       </DialogContent>
//     </Dialog>
//   );
// };