import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { Affix, Layout } from 'antd'
import SiderComponent from '../components/SiderComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddProduct, Categories, CategoryDetail, Inventories, ManageStore, Orders, ReportScreen, Suppliers } from '../screens'
import HeaderComponent from '../components/HeaderComponent'

const {Content, Footer, Header, Sider} = Layout

const MainRouters = () => {
  return (
    <BrowserRouter>
      <Layout>
        <SiderComponent/>
        <Layout style={{
						backgroundColor: 'white !important',
					}}>
          <Affix offsetTop={0}>
						<HeaderComponent />
					</Affix>
          <Content>
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
          <Footer/>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}

export default MainRouters