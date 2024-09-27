import { useEffect, useState } from 'react'
import {Button, Empty, message, Modal, Space, Table, Typography} from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Edit2, Filter, Sort, UserRemove } from 'iconsax-react';
import { colors } from '../constants/colors';
import { ToogleSupplier } from '../modals';
import { SupplierModel } from '../models/SupplierModel';
import handleAPI from '../apis/handleAPI';
import { FormModel } from '../models/FormModel';
import TableComponent from '../components/TableComponent';

const {Title, Text} = Typography;
const Suppliers = () => {
  const [isVisibleModalAddNew, setIsVisibleMoalAddNew] = useState(false)
  const {confirm} = Modal
  const [suppliers , setSuppliers] = useState<SupplierModel[]>([]);
  const [isLoading, setIsLoading]  = useState(false);
  const [supplierSelected, setSupplierSelected] = useState<SupplierModel>();
  const  [pageSize, setPageSize] = useState(10)
  const  [page, setPage] = useState(1)
  const [total, setTotal] = useState<number>(10)

  const [forms, setForms] = useState<FormModel>();

  const columns : ColumnProps<SupplierModel>[] = [
    {
      key : 'index',
      dataIndex : 'index',
      title : '#',
      align : 'center'
    },
    {
      key : 'name',
      dataIndex : 'name',
      title : 'Supplier Name'
    },
    {
      key : 'product',
      dataIndex : 'product',
      title : 'Product'
    },
    {
      key : 'contact',
      dataIndex : 'contact',
      title : 'Contact'
    },
    {
      key : 'email',
      dataIndex : 'email',
      title : 'Email'
    },
    {
      key : 'type',
      dataIndex : 'isTalking',
      title : 'Type',
      render: (isTalking : boolean) => <Text type={isTalking ? 'success' : 'danger'}>{isTalking ? 'Talking Return' : 'Not Talking Return'}</Text>
    },
    {
      key : 'ontheway',
      dataIndex : 'active',
      title : 'On the way',
      render : (num) => num ?? '-'
    },
    {
      key : 'buttonContainer',
      title : 'Action',
      dataIndex : '',
      render : (item : SupplierModel) => 
      <Space>
          <Button 
            onClick={()=>{
              setSupplierSelected(item)
              setIsVisibleMoalAddNew(true)
            }}
            type='text' 
            icon={
              <Edit2 
                size={18} 
                className='text-info' 
              />
            }
          />
          <Button 
            onClick={()=>confirm({
              title : 'Confirm',
              content : 'Are you sure you want delete supllier',
              onOk : () => removeSupplier(item._id)
            })}
            type='text' icon={<UserRemove size={18} className='text-danger' />}/>
      </Space>,
      fixed : 'right',
      align : 'right'
    }
  ];

  useEffect(() => {
    getSuppliers();
  },[page, pageSize])

  useEffect(() => {
		getData();
	}, []);


  const getData = async () => {
		setIsLoading(true);
		try {
			await getFroms();
		} catch (error: any) {
			message.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};


  const getFroms = async () => {
		const api = `/supplier/get-form-supplier`;
		const res = await handleAPI(api);

		res.data && setForms(res.data);
	};

  const getSuppliers = async () => {
    const api = `/supplier?page=${page}&pageSize=${pageSize}`
    setIsLoading(true)
    try {
      const res = await handleAPI(api)
      res.data && setSuppliers(res.data.items)

      const items : SupplierModel[] = [];

      res.data.items.forEach((item : any, index: number) => 
        items.push({
          index : (page - 1) * pageSize + (index + 1),
          ...item,
        })
      )
      setSuppliers(items)
      setTotal(res.data.total)
    } catch (error : any) {
      message.error(error.message)
    }finally{
      setIsLoading(false)
    }
  };

  const removeSupplier = async (id : string) => {

    try {
          //soft delete
      // await handleAPI(`/supplier/update?id=${id}`, {isDeleted : true}, 'put')
      await handleAPI(`/supplier/remove?id=${id}`, undefined, 'delete');
      await getSuppliers()
      message.success('Remove suplier succesfully')
    } catch (error) {
      console.log(error)
    }
  }

  return forms ? (
    <div>
			<TableComponent
				api='supplier'
				onPageChange={(val) => {
					setPage(val.page);
					setPageSize(val.pageSize);
				}}
				onAddNew={() => {
					setIsVisibleMoalAddNew(true);
				}}
				loading={isLoading}
				forms={forms}
				records={suppliers}
				total={total}
				extraColumn={(item) => (
					<Space>
						<Button
            // onClick={()=>console.log(item)}
							type='text'
							onClick={() => {
								setSupplierSelected(item);
								setIsVisibleMoalAddNew(true);
							}}
							icon={<Edit2 size={18} className='text-info' />}
						/>

						<Button
							onClick={() =>
								confirm({
									title: 'Comfirm',
									content: 'Are you sure you want to remove this supplier?',
									onOk: () => removeSupplier(item._id),
								})
							}
							type='text'
							icon={<UserRemove size={18} className='text-danger' />}
						/>
					</Space>
				)}
			/>

			<ToogleSupplier
				visible={isVisibleModalAddNew}
				onClose={() => {
					supplierSelected && getSuppliers();
					setSupplierSelected(undefined);
					setIsVisibleMoalAddNew(false);
				}}
				onAddNew={(val) => setSuppliers([...suppliers, val])}
				supplier={supplierSelected}
			/>
		</div>
  ) : (
		<Empty />
	);
}

export default Suppliers