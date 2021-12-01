import { ModalProps, Input, Modal, Col, Form, message, Row, Button, Spin } from "antd"
import React, { ReactElement, useState, useEffect } from "react"
import { injectIntl, IntlShape } from "react-intl"
import { EditorState } from "draft-js"
import { useDispatch, useSelector } from "react-redux"
import { UploadFile, UploadProps } from "antd/lib/upload/interface"
import { DownOutlined } from "@ant-design/icons"
import { TCoordinates, TSatelliteDetails } from "../Types/Setellites"
import axios from "axios"
import JSONPretty from "react-json-pretty"

type TProps = ModalProps & {
    visible: boolean
    onCancel: () => void
    onOk: () => void
    data: TSatelliteDetails
}

const ModalScreen: React.FC<TProps> = (props): ReactElement => {
    const [loadingModal, setLoadingModal] = useState(false)
    const [location, setLocation] = useState<TCoordinates>({
        latitude: 0,
        longitude: 0,
        timezone_id: "",
        offset: 0,
        country_code: "",
        map_url: "https://maps.google.com/maps?q=37.795517,-122.393693&z=4",
    })
    useEffect(() => {
        console.log("masuk")
        const fetchData = async () => {
            try {
                setLoadingModal(true)
                console.log(props.data.latitude, props.data.longitude)
                const { data: response } = await axios.get(`https://api.wheretheiss.at/v1/coordinates/${props.data.latitude},${props.data.longitude}`)
                console.log(response)
                setLocation(response)
                setLoadingModal(false)
            } catch (error: any) {
                console.error(error.message)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            <Modal visible={props.visible} onCancel={props.onCancel} width={"80%"}>
                <Spin spinning={loadingModal}>
                    <Row justify={"space-between"}>
                        <Col span="12">
                            <JSONPretty id="json-pretty" data={location}></JSONPretty>
                        </Col>
                        <Col span="10">
                            <div className="google-map-code">
                                <iframe src={`${location.map_url}&output=embed`}></iframe>
                            </div>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        </>
    )
}

export default ModalScreen
