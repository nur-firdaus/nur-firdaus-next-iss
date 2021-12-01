import { Badge, Breadcrumb, Button, Card, Col, ConfigProvider, DatePicker, FormInstance, Layout, Menu, Row, Space, Spin, Table, Tabs } from "antd"

import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import { useDispatch } from "react-redux"
import ReactDOM from "react-dom"
import "antd/dist/antd.css"
import "./index.css"
import { TSatelliteDetails } from "../Types/Setellites"
import ModalScreen from "./ModalScreen"

type TProps = {
    data: TSatelliteDetails[]
}

const TableScreen: React.FC<TProps> = (props) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<TSatelliteDetails>()

    const columns: any = [
        {
            title: "Location",
            dataIndex: "Location",
            key: "Location",
            render: (value: any, record: TSatelliteDetails) => (
                <>
                    <Button onClick={() => onClickView(record)} type="primary" block>
                        View
                    </Button>
                </>
            ),
        },
        {
            title: "latitude",
            dataIndex: "latitude",
            key: "latitude",
            render: (value: any, record: TSatelliteDetails) => <>{record.latitude}</>,
        },
        {
            title: "longitude",
            dataIndex: "longitude",
            key: "longitude",
            render: (value: any, record: TSatelliteDetails) => <>{record.longitude}</>,
        },
        {
            title: "altitude",
            dataIndex: "altitude",
            key: "altitude",
            render: (value: any, record: TSatelliteDetails) => <>{record.altitude}</>,
        },
        {
            title: "velocity",
            dataIndex: "velocity",
            key: "velocity",
            render: (value: any, record: TSatelliteDetails) => <>{record.velocity}</>,
        },
        {
            title: "visibility",
            dataIndex: "visibility",
            key: "visibility",
            render: (value: any, record: TSatelliteDetails) => <>{record.visibility}</>,
        },
        {
            title: "footprint",
            dataIndex: "footprint",
            key: "footprint",
            render: (value: any, record: TSatelliteDetails) => <>{record.footprint}</>,
        },
        {
            title: "timestamp",
            dataIndex: "timestamp",
            key: "timestamp",
            render: (value: any, record: TSatelliteDetails) => <>{record.timestamp}</>,
        },
        {
            title: "daynum",
            dataIndex: "daynum",
            key: "daynum",
            render: (value: any, record: TSatelliteDetails) => <>{record.daynum}</>,
        },
        {
            title: "solar_lat",
            dataIndex: "solar_lat",
            key: "solar_lat",
            render: (value: any, record: TSatelliteDetails) => <>{record.solar_lat}</>,
        },
        {
            title: "solar_lon",
            dataIndex: "solar_lon",
            key: "solar_lon",
            render: (value: any, record: TSatelliteDetails) => <>{record.solar_lon}</>,
        },
        {
            title: "units",
            dataIndex: "units",
            key: "units",
            render: (value: any, record: TSatelliteDetails) => <>{record.units}</>,
        },
    ]

    const onClickView = (record: TSatelliteDetails) => {
        setOpenModal(true)
        setSelectedRow(record)
    }

    const handleOnClose = () => {
        setOpenModal(false)
    }

    const handleOnReply = () => {
        setOpenModal(false)
    }
    return (
        <>
            <ModalScreen visible={openModal} onCancel={handleOnClose} onOk={handleOnReply} />

            <Card title="Result">
                <Table scroll={{ x: 1500, y: 300 }} columns={columns} dataSource={props.data} />,
            </Card>
        </>
    )
}

export default TableScreen
