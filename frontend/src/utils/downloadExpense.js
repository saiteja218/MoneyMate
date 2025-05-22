    import axiosInstance from "./axios";

    const downloadExcel=async(data,number)=>{
        console.log(number);
        try {
            // if(number===2){
                const response=await axiosInstance.post('/expense/downloadExcel',data,{responseType:'blob'});
                const url=window.URL.createObjectURL(new Blob([response.data]));
                const link=document.createElement('a');
                link.href=url;
                link.setAttribute('download','expenses.xlsx');
            // }
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);


        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }

    }

    export default downloadExcel