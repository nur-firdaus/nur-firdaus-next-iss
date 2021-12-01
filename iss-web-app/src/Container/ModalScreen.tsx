import { ModalProps, Input, Modal, Col, Form, message, Row, Button, Spin } from "antd"
import React, { ReactElement, useState, useEffect } from "react"
import { injectIntl, IntlShape } from "react-intl"
import { EditorState } from "draft-js"
import { useDispatch, useSelector } from "react-redux"
import { UploadFile, UploadProps } from "antd/lib/upload/interface"
import { DownOutlined } from "@ant-design/icons"

type TProps = ModalProps & {
    visible: boolean
    onCancel: () => void
    onOk: () => void
}

const ModalScreen: React.FC<TProps> = (props): ReactElement => {
    return (
        <>
            <Modal visible={props.visible} onCancel={props.onCancel}>
                hello
            </Modal>
        </>
    )
}

export default ModalScreen
