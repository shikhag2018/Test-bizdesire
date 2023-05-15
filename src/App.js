import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Button, Row, Col, Upload, DatePicker, Select } from 'antd';
import { PlusOutlined, MinusOutlined, UploadOutlined } from '@ant-design/icons'
import moment from 'moment';
import { submitForm } from '../src/redux/reducers/formReducer';
import Table from '../src/components/Table'
import { useDispatch, useSelector } from 'react-redux';
import './App.css'
import { fetchCandidates } from './redux/reducers/candidatesReducer';

const { Item } = Form;
const { Option } = Select;

const MyForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const state = useSelector(state => state)

    const { candidates, candidateForm } = state

    useEffect(() => {
        dispatch(fetchCandidates())
    }, [dispatch,candidateForm?.formData])

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            const residentialAddressValue = form.getFieldValue('residentialAddress');
            form.setFieldsValue({
                permanentAddress: {
                    street1: residentialAddressValue.street1,
                    street2: residentialAddressValue.street2,
                },
            });
        }
        else {
            form.setFieldsValue({
                permanentAddress: {
                    street1: null,
                    street2: null,
                },
            });
        }
    };

    const handleSubmit = (values) => {
        dispatch(submitForm(values));
        form.resetFields()
    };

    const initialValues = {
        uploadDocuments: [{ fileName: '', typeOfFile: '', document: null },
        { fileName: '', typeOfFile: '', document: null }]
    };

    const validateAge = (_, value) => {
        if (value && value.isAfter(moment().subtract(18, 'years'))) {
            return Promise.reject(new Error('You must be at least 18 years old.'));
        }
        return Promise.resolve();
    };

    return (
        <Row className='custom-row'>
            <Col xs={20} md={14}>
                <div className='form-heading'>React JS MACHINE TEST</div>
                {candidateForm?.error && <p>{candidateForm?.error}</p>}
                <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={initialValues}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter your first name' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please enter your last name' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Item label="Date of Birth" name="dateOfBirth"
                                rules={[{ required: true, message: 'Please enter your date of birth' },
                                { validator: validateAge, message: 'Minimum age should be 18 years' },]}>
                                <DatePicker className='input' style={{ width: '100%' }} />
                            </Item>
                        </Col>
                    </Row>
                    <div className='label'>Residential Address</div>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Item label="Street 1" name={['residentialAddress', 'street1']} rules={[{ required: true, message: 'Please enter your residential address' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Item label="Street 2" name={['residentialAddress', 'street2']} rules={[{ required: true, message: 'Please enter your residential address' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                    </Row>
                    <div className='label'>Permanent Address</div>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Item name="sameAsResidential" valuePropName="checked" noStyle>
                                <Checkbox onChange={handleCheckboxChange}>Same as Residential Address</Checkbox>
                            </Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Item label="Street 1" name={['permanentAddress', 'street1']} rules={[{ required: true, message: 'Please enter your permanent address' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Item label="Street 2" name={['permanentAddress', 'street2']} rules={[{ required: true, message: 'Please enter your permanent address' }]}>
                                <Input className='input' />
                            </Item>
                        </Col>
                    </Row>
                    <div className='label'>Upload Documents</div>
                    <Row gutter={16}>
                        <Col xs={24} md={24}>
                            <Form.List name="uploadDocuments">

                                {(fields, { add, remove }) => (
                                    <>
                                        <Row>
                                            <Col xs={22}>
                                                {fields.map((field, index) => (
                                                    <Row gutter={16} key={field.key}>
                                                        <Col span={6}>
                                                            <Item
                                                                label={`File Name ${index + 1}`}
                                                                name={[field.name, 'fileName']}
                                                                rules={[{ required: true, message: 'Please enter the file name' }]}
                                                            >
                                                                <Input className='input' />
                                                            </Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Item
                                                                label={`Type of File ${index + 1}`}
                                                                name={[field.name, 'fileType']}
                                                                rules={[{ required: true, message: 'Please enter the type of file' }]}
                                                            >
                                                                <Select>
                                                                    <Option value="image">Image</Option>
                                                                    <Option value="pdf">PDF</Option>
                                                                </Select>
                                                            </Item>
                                                        </Col>
                                                        <Col span={6}>
                                                            <Item
                                                                label={`Document ${index + 1}`}
                                                                name={[field.name, 'document']}
                                                                valuePropName="fileList"
                                                                getValueFromEvent={(e) => e && e.fileList}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: 'Please upload a file',
                                                                    },
                                                                    ({ getFieldValue }) => ({
                                                                        validator(_, value) {
                                                                            const fileType = getFieldValue(['uploadDocuments', field.name, 'fileType']);
                                                                            console.log(fileType, "ggg")
                                                                            if (fileType === 'image' && value && value[0].type.includes('image')) {
                                                                                return Promise.resolve();
                                                                            }
                                                                            if (fileType === 'pdf' && value && value[0].type === 'application/pdf') {
                                                                                return Promise.resolve();
                                                                            }
                                                                            return Promise.reject('Invalid file type');
                                                                        },
                                                                    }),
                                                                ]}
                                                            >
                                                                <Upload
                                                                    maxCount={1}
                                                                    beforeUpload={() => false}
                                                                >
                                                                    <Button className='input' icon={<UploadOutlined />}></Button>
                                                                </Upload>
                                                            </Item>
                                                        </Col>

                                                        <Col span={4} style={{ display: 'flex', alignItems: 'center' }}>
                                                            {index > 1 ?
                                                                <Button
                                                                    type="dashed"
                                                                    onClick={() => remove(field.name)}
                                                                    style={{ marginLeft: 8 }}
                                                                    icon={<MinusOutlined />}
                                                                />
                                                                : null}
                                                            {!index ?
                                                                <Form.Item>
                                                                    <Button
                                                                        type="dashed"
                                                                        onClick={() => add()}
                                                                        style={{ marginLeft: 4 }}
                                                                        icon={<PlusOutlined />}
                                                                    />
                                                                </Form.Item>

                                                                : null}
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24} className='button-wrapper'>
                            <Button
                                className='button'
                                disabled={candidateForm?.isLoading}
                                type="primary" htmlType="submit">{
                                    candidateForm?.isLoading ?
                                        'Saving....' :
                                        'Submit'
                                }</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col xs={18}>
                <Table candidates={candidates} />
            </Col>
        </Row>
    );
};

export default MyForm;
