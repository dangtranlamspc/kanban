import { useEffect, useState } from 'react'
import {Button, message, Modal, Space, Table, Typography} from 'antd'
import { ColumnProps } from 'antd/es/table'
import { Edit2, Filter, Sort, UserRemove } from 'iconsax-react';
import { colors } from '../constants/colors';
import { ToogleSupplier } from '../modals';
import { SupplierModel } from '../models/SupplierModel';
import handleAPI from '../apis/handleAPI';

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
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Table
        pagination={{
          showSizeChanger : true,
          onShowSizeChange(current, size) {
            setPageSize(size)
          },
          total,
          onChange(page, pageSize) {
            setPage(page)
          }
        }}
        scroll={{
          y : 'calc(100vh - 300px'
        }}
        loading={isLoading}
        dataSource={suppliers} 
        columns={columns} 
        title={() => (
          <div className='row'>
            <div className='col'>
              <Title level={5}>Suppliers</Title>
            </div>
            <div className="col text-right">
              <Space>
                <Button type='primary' onClick={ () => setIsVisibleMoalAddNew(true)}>Add Product</Button>
                <Button icon={<Sort size={20} color={colors.gray600} />}>Filters</Button>
                <Button>Download All</Button>
              </Space>
            </div>
          </div>
          ) 
        } 
      />

      <ToogleSupplier 
        visible={isVisibleModalAddNew}
        onClose={()=>{
          supplierSelected && getSuppliers()
          setIsVisibleMoalAddNew(false);
          setSupplierSelected(undefined);
        }

        }
        onAddNew={(val) => setSuppliers([...suppliers, val])}
        supplier={supplierSelected}
      />
    </div>
  )
}

export default Suppliers