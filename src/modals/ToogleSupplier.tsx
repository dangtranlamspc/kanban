import { Avatar, Button, Form, Input, message, Modal, Select, Typography } from 'antd'
import { User } from 'iconsax-react'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../constants/colors'
import { uploadFile } from '../utils/uploadFile'
import { replaceName } from '../utils/replaceName'
import handleAPI from '../apis/handleAPI'
import { SupplierModel } from '../models/SupplierModel'

interface Props {
    visible : boolean,
    onClose : () => void,
    onAddNew : (val : SupplierModel) => void
    supplier ?: SupplierModel
}

const {Paragraph} = Typography;

const ToogleSupplier = (props : Props) => {

  const { visible, onClose, onAddNew, supplier} = props;

  const [form] = Form.useForm();

  const [isLoading , setIsLoading]  = useState(false);

  const [isTalking, setIsTalking] = useState<boolean>();

  const [file , setFile] = useState<any>();

  const inpRef = useRef<any>();

  useEffect(()=>{
    if (supplier) {
      form.setFieldsValue(supplier)
      setIsTalking(supplier.isTalking === 1);
    }
  },[supplier])

  const addNewSupplier = async (values : any) => {

    setIsLoading(true)  

    const data : any = {};

    const api = `/supplier/${supplier ? `update?id=${supplier._id}` : 'add-new'}`

    for (const i in values){
      data[i] = values[i] ?? ''
    }
    
    data.price = values.price ? parseInt(values.price) : 0

    data.isTalking = isTalking ? 1 : 0

    if (file) {
      data.photoUrl = await uploadFile(file)
    }

    data.slug = replaceName(values.name)

    try {
      const res : any = await handleAPI(api, data ,supplier ? 'put' : 'post')
      message.success(res.message)
      !supplier && onAddNew(res.data)
      handleClose();
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const handleClose = async () => {
    form.resetFields()
    setFile(undefined)
    onClose()
  }

  return (
    <Modal
      closable={!isLoading}
      width={720}
      open={visible}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={() => form.submit()}
      okButtonProps={{
        loading : isLoading
      }}
      title={supplier ? 'Update Supplier' : 'Add Supplier'}
      okText={supplier ? 'Update Supplier' : 'Add Supplier'}
      cancelText='Discard'
    >
      <label htmlFor='inpFile' className='p-2 mb-3 row'>
				{file ? (
					<Avatar size={100} src={URL.createObjectURL(file)} />
				) : supplier ? (
					<Avatar size={100} src={supplier.photoUrl} />
				) : (
					<Avatar
						size={100}
						style={{
							backgroundColor: 'white',
							border: '1px dashed #e0e0e0',
						}}>
						<User size={60} color={colors.gray600} />
					</Avatar>
				)}

				<div className='ml-3'>
					<Paragraph className='text-muted m-0'>Drag image here</Paragraph>
					<Paragraph className='text-muted mb-2'>Or</Paragraph>
					<Button onClick={() => inpRef.current.click()} type='link'>
						Browse image
					</Button>
				</div>
			</label>
        <Form
          disabled={isLoading}
          onFinish={addNewSupplier}
          layout='horizontal'
          labelCol={{span : 6}}
          wrapperCol={{span : 16}}
          size='large'
          form={form}
        >
          <Form.Item 
            name={'name'}
            label='Supplier Name'
            rules={[{
              required : true,
              message : 'Please enter supplier name'
            }]}
          >
            <Input placeholder='Entersupplier name' allowClear />
          </Form.Item>
          <Form.Item 
            name={'product'}
            label='Product' 
          >
            <Input placeholder='Enter product' allowClear />
          </Form.Item>
          <Form.Item 
            name={'categories'}
            label='Category' 
          >
            <Select options={[]} placeholder='Select category' />
          </Form.Item>
          <Form.Item 
            name={'price'}
            label='Buying Price' 
          >
            <Input placeholder='Enter buying price' type='number' allowClear/>
          </Form.Item>
          <Form.Item 
            name={'email'}
            label='Email' 
          >
            <Input placeholder='Enter your email' allowClear type='email'/>
          </Form.Item>
          <Form.Item 
            name={'active'}
            label='Active' 
          >
            <Input type='number' placeholder='Enter your active' allowClear/>
          </Form.Item>
          <Form.Item 
            name={'contact'}
            label='Contact Number' 
          >
            <Input placeholder='Enter supplier contact numvber' allowClear />
          </Form.Item>
          <Form.Item 
            name={'type'}
            label='Type' 
          >
            <div className='mb-2'>
              <Button size='middle' onClick={()=>setIsTalking(false)} type={isTalking === false ? 'primary' : 'default'}>Not taking return</Button>
            </div>
            <Button size='middle' onClick={() => setIsTalking(true)} type={isTalking ? 'primary' : 'default'}>Taking return</Button>
          </Form.Item>
        </Form>
        <div className="d-none">
          <input 
            ref={inpRef} 
            accept='image/*'
            type='file' 
            name='' 
            id='inpFile' 
            onChange={(val:any) => setFile(val.target.files[0])} />
        </div>
    </Modal>
  )
}

export default ToogleSupplier