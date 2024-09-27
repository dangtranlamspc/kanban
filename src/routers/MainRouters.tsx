import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { Affix, Layout, theme } from 'antd'
import SiderComponent from '../components/SiderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddProduct, Categories, CategoryDetail, Inventories, ManageStore, Orders, ReportScreen, Suppliers } from '../screens'
import HeaderComponent from '../components/HeaderComponent'

const {Content, Footer, Header, Sider} = Layout

const MainRouters = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	  } = theme.useToken();
  return (
    <BrowserRouter>
		<Layout>
			<Affix offsetTop={0}>
				<SiderComponent />
			</Affix>
			<Layout 
				// style={{
				// 	backgroundColor: 'white !important',
				// }}
				// style={{ padding: '0 24px 24px', paddingTop: '0 24px 24px' }}
			>
				<Affix offsetTop={0}>
					<HeaderComponent />
				</Affix>
				<Content 
					className='mt-3 mb-2 container-fluid'
					// style={{
					// 	padding: 24,
					// 	margin: 0,
					// 	minHeight: 280,
					// 	background: colorBgContainer,
					// 	borderRadius: borderRadiusLG,
					//   }}
				>
					<Routes>
						<Route path='/' element={<HomeScreen/>}/>
					<Route>
						<Route path='/inventory' element={<Inventories />} />
						<Route path='/inventory/add-product' element={<AddProduct />} />
					</Route>
					<Route path='/report' element={<ReportScreen />} />
					<Route path='/suppliers' element={<Suppliers />} />
					<Route path='/orders' element={<Orders />} />
					<Route>
						<Route path='/categories' element={<Categories />} />
							<Route
								path='/categories/detail/:slug'
								element={<CategoryDetail />}
							/>
						</Route>

					<Route path='/manage-store' element={<ManageStore />} />
					</Routes>
				</Content>
				<Footer className='bg-white' />
			</Layout>
		</Layout>
    </BrowserRouter>
  )
}

export default MainRouters