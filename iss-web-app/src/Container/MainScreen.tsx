import { Badge, Breadcrumb, Button, Card, Col, ConfigProvider, DatePicker, FormInstance, Layout, Menu, Row, Space, Spin, Table, Tabs } from "antd"

import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import { useDispatch } from "react-redux"
import ReactDOM from "react-dom"
import "antd/dist/antd.css"
import "./index.css"
import { TSatellite, TSatelliteDetails } from "../Types/Setellites"

import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons"
import JSONPretty from "react-json-pretty"
import moment from "moment"
import TableScreen from "./TableScreen"

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

    const [satellitesDetails, setSatellitesDetails] = useState<TSatelliteDetails[]>([])

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
            try {
                const { data: response } = await axios.get(`https://api.wheretheiss.at/v1/satellites/${listOfsatellites[0].id}`)
                setSatelliteDetails(response)
            } catch (error: any) {
                console.error(error.message)
            }
        }

        fetchData()
    }, [listOfsatellites, satelliteDetails])

    function onGetDateValue(value: any) {
        let valueTimeStamp: number = Number(moment(value).unix().toString())
        //1 min = 6000 timestamp
        //6000*50min=300000
        let earlyTimeStamp: number = valueTimeStamp - 300000
        processTimeZone(earlyTimeStamp)
    }

    const processTimeZone = async (ts: number) => {
        let text = ""
        for (let i = 0; i < 10; i++) {
            let incrementTs = ts + 300000 * (i + 1)
            text += `${incrementTs},`
        }
        fetchLocationBasedTimeZone(text)
    }

    const fetchLocationBasedTimeZone = async (ts: string) => {
        setLoading(true)
        try {
            const { data: response } = await axios.get(`https://api.wheretheiss.at/v1/satellites/${listOfsatellites[0].id}/positions?timestamps=${ts}&units=miles`)
            setSatellitesDetails(response)
        } catch (error: any) {
            console.error(error.message)
        }
        setLoading(false)
    }

    const { Header, Content, Footer } = Layout

    return (
        <>
            <Spin spinning={loading}>
                <Layout className="layout">
                    <Header>
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}></Menu>
                    </Header>
                    <Content style={{ padding: "0 50px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-content">
                            <Card title="ISS LOCATION">
                                <JSONPretty id="json-pretty" data={satelliteDetails}></JSONPretty>
                                <div className="google-map-code">
                                    <iframe src="https://maps.google.com/maps?q=37.795517,-122.393693&z=4"></iframe>
                                </div>
                            </Card>
                            <Card title="Getting the location of the ISS at a specific time">
                                <DatePicker onOk={onGetDateValue} bordered={true} showTime={true} suffixIcon="" format={"DD-MM-Y HH:mm:ss"} />
                            </Card>
                            <TableScreen data={satellitesDetails} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>Nur Firdaus ©2021 Created Using React.JS</Footer>
                </Layout>
            </Spin>
        </>
    )
}

export default MainScreen
