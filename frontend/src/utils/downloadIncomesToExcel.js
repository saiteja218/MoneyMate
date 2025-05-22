    import axiosInstance from "./axios";

    const downloadIncomesToExcel=async(data)=>{
        // console.log(number);
        try {
            // if(number===2){
                const response=await axiosInstance.post('/income/downloadExcel',data,{responseType:'blob'});
                const url=window.URL.createObjectURL(new Blob([response.data]));
                const link=document.createElement('a');
                link.href=url;
                link.setAttribute('download','income.xlsx');
            // }
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);


        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }

    }

    export default downloadIncomesToExcel