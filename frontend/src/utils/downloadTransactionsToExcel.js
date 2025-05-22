    import { CloudDone } from "@mui/icons-material";
import axiosInstance from "./axios";

    const downloadTransactionsToExcel=async(data)=>{
        // console.log(data)
        try {
                const response=await axiosInstance.post('/income/downloadAllTrasactions',data,{responseType:'blob'});
                const url=window.URL.createObjectURL(new Blob([response.data]));
                const link=document.createElement('a');
                link.href=url;
                link.setAttribute('download','Transactions.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);


        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }

    }

    export default downloadTransactionsToExcel