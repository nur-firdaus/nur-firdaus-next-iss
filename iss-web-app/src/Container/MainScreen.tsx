import { Badge, Breadcrumb, Button, Card, Col, ConfigProvider, DatePicker, FormInstance, Layout, Menu, Row, Space, Spin, Tabs } from "antd"

import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import { useDispatch } from "react-redux"
import ReactDOM from "react-dom"
import "antd/dist/antd.css"
import "./index.css"
import Action from "../Redux/Actions"
import { TSatellite, TSatelliteDetails } from "../Types/Setellites"

import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons"
import JSONPretty from "react-json-pretty"
import moment from "moment"

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

type TProps = {}

const MainScreen: React.FC<TProps> = (props) => {
    const [loading, setLoading] = useState(false)
    const [listOfsatellites, setListOfsatellites] = useState<TSatellite[]>([])
    const [satelliteDetails, setSatelliteDetails] = useState<TSatelliteDetails>({
        id: 0,
        name: "",
        latitude: 0,
        longitude: 0,
        altitude: 0,
        velocity: 0,
        visibility: "",
        footprint: 0,
        timestamp: 0,
        daynum: 0,
        solar_lat: 0,
        solar_lon: 0,
        units: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: response } = await axios.get("https://api.wheretheiss.at/v1/satellites")
                setListOfsatellites(response)
            } catch (error: any) {
                console.error(error.message)
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: response } = await axios.get(`https://api.wheretheiss.at/v1/satellites/${listOfsatellites[0].id}`)
                setSatelliteDetails(response)
            } catch (error: any) {
                console.error(error.message)
            }
            setLoading(false)
        }

        fetchData()
    }, [listOfsatellites])

    function onGetDateValue(value: any) {
        const ts = moment(value).unix()
        const mDate = moment.utc(value).local()
        console.log("onOk: ", value, mDate)
        console.log("ts: ", ts)

        fetchLocationBasedTimeZone(ts)
    }
    const fetchLocationBasedTimeZone = async (ts: number) => {
        setLoading(true)
        try {
            const { data: response } = await axios.get(`https://api.wheretheiss.at/v1/satellites/${listOfsatellites[0].id}/positions?timestamps=${ts}&units=miles`)
            console.log("TS", response)
        } catch (error: any) {
            console.error(error.message)
        }
        setLoading(false)
    }

    console.log(listOfsatellites)
    console.log(satelliteDetails)

    const { Header, Content, Footer } = Layout
    const { TabPane } = Tabs
    return (
        <>
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
                        {new Array(15).fill(null).map((_, index) => {
                            const key = index + 1
                            return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>
                        })}
                    </Menu>
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Card title="ISS LOCATION">
                            <JSONPretty id="json-pretty" data={satelliteDetails}></JSONPretty>
                        </Card>
                        <Card title="Getting the location of the ISS at a specific tim">
                            <DatePicker onOk={onGetDateValue} bordered={true} showTime={true} suffixIcon="" format={"DD-MM-Y HH:mm:ss"} />
                        </Card>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Nur Firdaus ©2021 Created Using React.JS</Footer>
            </Layout>
        </>
    )
}

export default MainScreen
