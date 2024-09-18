import { Avatar, Button, Form, Input, Modal, Select, Typography } from 'antd'
import { User } from 'iconsax-react'
import React, { useRef, useState } from 'react'
import { colors } from '../constants/colors'

interface Props {
    visible : boolean,
    onClose : () => void,
    onAddNew : (val : any) => void
    supplier ?: any
}

const {Paragraph} = Typography;

const ToogleSupplier = (props : Props) => {

  const { visible, onClose, onAddNew, supplier} = props;

  const [form] = Form.useForm();

  const [isLoading , setIsLoading]  = useState(false);

  const [isTalking, setIsTalking] = useState<boolean>();

  const [file , setFile] = useState<any>();

  const inpRef = useRef<any>()

  const addNewSupplier = async () => {}

  const handleClose = async () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      width={720}
      open={visible}
      onClose={handleClose}
      onCancel={handleClose}
      onOk={() => form.submit()}
      title='New Supplier'
      okText='Add Supplier'
      cancelText='Discard'
    >
      <label htmlFor="inpFile" className='p-2 mb-3 row'>
        <Avatar size={100} style={{backgroundColor:'white', border:'1px dashed #e0e0e0'}}>
          <User size={60} color={colors.gray600}/>
        </Avatar>
        <div className='ml-3'>
          <Paragraph className='text-muted m-0' >Drag image here</Paragraph>
          <Paragraph className='text-muted mb-2' >Or</Paragraph>
          <Button type='link'>Browse mage</Button>
        </div>
      </label>
        <Form 
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
            name={'name'}
            label='Category' 
          >
            <Select options={[]} placeholder='Select category' />
          </Form.Item>
          <Form.Item 
            name={'price'}
            label='Buying Price' 
          >
            <Input placeholder='Enter buying price' type='number' allowClear />
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
              <Button onClick={()=>setIsTalking(false)} type={isTalking === false ? 'primary' : 'default'}>Not taking return</Button>
            </div>
            <Button onClick={() => setIsTalking(true)} type={isTalking ? 'primary' : 'default'}>Taking return</Button>
          </Form.Item>
        </Form>
        <div className="d-none">
          <input ref={inpRef} type='file' name='' id='inpFile' onChange={(val:any) => setFile(val.target.files[0])} />
        </div>
    </Modal>
  )
}

export default ToogleSupplier