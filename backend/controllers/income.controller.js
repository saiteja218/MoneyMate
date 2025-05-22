import Income from "../models/income.model.js";

export const addIncome = async (req, res) => {
    const { source,amount,date } = req.body;
    try {
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        const newIncome = new Income({
            user: req.user._id,
            source,
            amount,
            date
        })
        if (newIncome) {
            await newIncome.save();
            return res.status(201).json(newIncome)
        } else {
            return res.status(400).json({ message: "Income not found" })
        }
    } catch (error) {
        console.log("Error in add income controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getAllIncome=async(req,res)=>{
    const id=req.user._id;
    try {
        const incomes= await Income.find({user:id}).sort({ createdAt: -1 })
        if(incomes) {
            return res.status(200).json(incomes)
        } else {
            return res.status(400).json({ message: "No income found" })
        }
    } catch (error) {
        console.log("Error in get all income controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}

export const deleteIncome=async(req,res)=>{
    const {id}=req.params;
    try {
        const deleteIncome= await Income.findByIdAndDelete(id)
        if(deleteIncome) {
            return res.status(200).json({ message: "Income deleted successfully" })
        } else {
            return res.status(400).json({ message: "No income found" })
        }
    } catch (error) {
        console.log("Error in delete income controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}

export const toExcel = async (req, res) => {
    const incomes = req.body;
    try {
        const { default: ExcelJS } = await import('exceljs');;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Incomes');

        worksheet.columns = [
            { header: 'Source', key: 'source', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 20 },
        ]

        incomes.forEach(item => {
            worksheet.addRow({
                source: item.source,
                amount: item.amount,
                date: new Date(item.date).toISOString().split('T')[0],
            });
        });

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=incomes.xlsx'
        )
        res.setHeader(
            'Content-type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )

        await workbook.xlsx.write(res);
        res.end();



    } catch (error) {
        console.log("Error in toExcel controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}
export const toExcelAllTrasactions = async (req, res) => {
    const incomes = req.body;
    // console.log(incomes)
    try {
        const { default: ExcelJS } = await import('exceljs');;
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Transactions');

        worksheet.columns = [
            { header: 'Source', key: 'source', width: 20 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Type', key: 'type', width: 20 },
        ]

        incomes.forEach((tx) => {
           worksheet.addRow(tx);
    });


        res.setHeader(
            'Content-Disposition',
            'attachment; filename=transactions.xlsx'
        )
        res.setHeader(
            'Content-type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )

        await workbook.xlsx.write(res);
        res.end();



    } catch (error) {
        console.log("Error in toExcelAllTransactions controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}
