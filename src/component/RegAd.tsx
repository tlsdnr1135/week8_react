import React from 'react';
import { Header } from '../common/Header';
import { Footer } from '../common/Footer';
import { Outlet } from 'react-router-dom';

export const RegAd = () => {
    return (
        <>
            <main className="ant-layout-content css-dev-only-do-not-override-1me4733">
                <div className="site-layout-content">
                    <div className="inner-content">
                        <div className="content-header">
                            <h1 className="fz-32 fc-gray-900">광고 등록</h1>
                        </div>
                        <div className="content-body">
                            <section className="wrap-section wrap-tbl">
                                <div className="box-header">
                                    <div className="box-left">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">상품 조회</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="tbl">
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-15 fc-gray-500">
                                                        상품명
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <div className="form-group">
                                                    <input
                                                        name="itemName"
                                                        placeholder="상품명을 입력하세요."
                                                        className="ant-input css-dev-only-do-not-override-1me4733"
                                                        type="text"
                                                        style={{ width: '500px' }}
                                                    />
                                                </div>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-15 fc-gray-500">
                                                        상품번호
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <div className="form-group">
                                                    <input
                                                        name="itemNo"
                                                        placeholder="상품번호을 입력하세요."
                                                        className="ant-input css-dev-only-do-not-override-1me4733"
                                                        type="text"
                                                        // defaultValue
                                                        style={{ width: '500px' }}
                                                    />
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div className="box-footer">
                                    <div className="box-center">
                                        <button
                                            type="button"
                                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg pink"
                                        >
                                            <span>조회</span>
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <section className="wrap-section wrap-datagrid">
                                <div className="box-header">
                                    <div className="box-left">
                                        <h2 className="fz-24 fc-gray-700">상품 조회 결과</h2>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="ant-table-wrapper css-dev-only-do-not-override-1me4733">
                                        <div className="ant-spin-nested-loading css-dev-only-do-not-override-1me4733">
                                            <div className="ant-spin-container">
                                                <div className="ant-table ant-table-bordered">
                                                    <div className="ant-table-container">
                                                        <div className="ant-table-content">
                                                            <table style={{ tableLayout: 'auto' }}>
                                                                <colgroup />
                                                                <thead className="ant-table-thead">
                                                                    <tr>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품번호
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품명
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            성인 상품 여부
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품 가격
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품 활성화 여부
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품 선택
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="ant-table-tbody">
                                                                    <tr
                                                                        data-row-key={112}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB01
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품01
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            YES
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            10000
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={113}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB02
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품02
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NO
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            5000
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={114}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB03
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품03
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            YES
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            4000
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={115}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB04
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품04
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NO
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            3000
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={116}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB05
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품05
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NO
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            100
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={117}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB06
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품06
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            YES
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            200
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={118}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB07
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품07
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NO
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            300
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={234}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB08
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품08
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            YES
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            400
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={235}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB09
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품09
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            YES
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            500
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                    <tr
                                                                        data-row-key={236}
                                                                        className="ant-table-row ant-table-row-level-0"
                                                                    >
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            NBS_DB10
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            상품상품10
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            YES
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            60000
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            활성화
                                                                        </td>
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default ant-btn-sm pink"
                                                                            >
                                                                                <span>선택</span>
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <ul className="ant-pagination ant-table-pagination ant-table-pagination-right css-dev-only-do-not-override-1me4733">
                                                    <li className="ant-pagination-total-text">
                                                        Total 17 items
                                                    </li>
                                                    <li
                                                        title="Previous Page"
                                                        className="ant-pagination-prev ant-pagination-disabled"
                                                        aria-disabled="true"
                                                    >
                                                        <button
                                                            className="ant-pagination-item-link"
                                                            type="button"
                                                            tabIndex={-1}
                                                            disabled
                                                        >
                                                            <span
                                                                role="img"
                                                                aria-label="left"
                                                                className="anticon anticon-left"
                                                            >
                                                                <svg
                                                                    viewBox="64 64 896 896"
                                                                    focusable="false"
                                                                    data-icon="left"
                                                                    width="1em"
                                                                    height="1em"
                                                                    fill="currentColor"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </li>
                                                    <li
                                                        title="1"
                                                        className="ant-pagination-item ant-pagination-item-1 ant-pagination-item-active"
                                                        tabIndex={0}
                                                    >
                                                        <a rel="nofollow">1</a>
                                                    </li>
                                                    <li
                                                        title="2"
                                                        className="ant-pagination-item ant-pagination-item-2"
                                                        tabIndex={0}
                                                    >
                                                        <a rel="nofollow">2</a>
                                                    </li>
                                                    <li
                                                        title="Next Page"
                                                        tabIndex={0}
                                                        className="ant-pagination-next"
                                                        aria-disabled="false"
                                                    >
                                                        <button
                                                            className="ant-pagination-item-link"
                                                            type="button"
                                                            tabIndex={-1}
                                                        >
                                                            <span
                                                                role="img"
                                                                aria-label="right"
                                                                className="anticon anticon-right"
                                                            >
                                                                <svg
                                                                    viewBox="64 64 896 896"
                                                                    focusable="false"
                                                                    data-icon="right"
                                                                    width="1em"
                                                                    height="1em"
                                                                    fill="currentColor"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
                                                                </svg>
                                                            </span>
                                                        </button>
                                                    </li>
                                                    <li className="ant-pagination-options">
                                                        <div
                                                            className="ant-select ant-pagination-options-size-changer css-dev-only-do-not-override-1me4733 ant-select-single ant-select-show-arrow"
                                                            aria-label="Page Size"
                                                        >
                                                            <div className="ant-select-selector">
                                                                <span className="ant-select-selection-search">
                                                                    <input
                                                                        type="search"
                                                                        autoComplete="off"
                                                                        className="ant-select-selection-search-input"
                                                                        role="combobox"
                                                                        aria-expanded="false"
                                                                        aria-haspopup="listbox"
                                                                        aria-owns="rc_select_1_list"
                                                                        aria-autocomplete="list"
                                                                        aria-controls="rc_select_1_list"
                                                                        aria-activedescendant="rc_select_1_list_0"
                                                                        aria-label="Page Size"
                                                                        readOnly
                                                                        unselectable="on"
                                                                        // defaultValue
                                                                        id="rc_select_1"
                                                                        style={{ opacity: 0 }}
                                                                    />
                                                                </span>
                                                                <span
                                                                    className="ant-select-selection-item"
                                                                    title="10 / page"
                                                                >
                                                                    10 / page
                                                                </span>
                                                            </div>
                                                            <span
                                                                className="ant-select-arrow"
                                                                unselectable="on"
                                                                aria-hidden="true"
                                                                style={{ userSelect: 'none' }}
                                                            >
                                                                <span
                                                                    role="img"
                                                                    aria-label="down"
                                                                    className="anticon anticon-down ant-select-suffix"
                                                                >
                                                                    <svg
                                                                        viewBox="64 64 896 896"
                                                                        focusable="false"
                                                                        data-icon="down"
                                                                        width="1em"
                                                                        height="1em"
                                                                        fill="currentColor"
                                                                        aria-hidden="true"
                                                                    >
                                                                        <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
                                                                    </svg>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="wrap-section wrap-tbl">
                                <div className="box-header">
                                    <div className="box-left">
                                        <div className="box-left">
                                            <h2 className="fz-24 fc-gray-700">선택한 상품 정보</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="tbl">
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-15 fc-gray-500">
                                                        상품번호
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <div className="form-group">
                                                    <span className="comp-txt">
                                                        <span className="table">
                                                            <span className="table-cell">
                                                                <b className="fz-14 fc-gray-400">
                                                                    NBS_DB10
                                                                </b>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-15 fc-gray-500">
                                                        상품명
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <div className="form-group">
                                                    <span className="comp-txt">
                                                        <span className="table">
                                                            <span className="table-cell">
                                                                <b className="fz-14 fc-gray-400">
                                                                    상품상품10
                                                                </b>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-15 fc-gray-500">
                                                        성인여부
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <div className="form-group">
                                                    <span className="comp-txt">
                                                        <span className="table">
                                                            <span className="table-cell">
                                                                <b className="fz-14 fc-gray-400">
                                                                    성인상품
                                                                </b>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                            <section className="wrap-section wrap-tbl">
                                <div className="box-header">
                                    <div className="box-left">
                                        <h2 className="fz-24 fc-gray-700">광고 그룹 선택</h2>
                                    </div>
                                    <div className="box-right">
                                        <button
                                            type="button"
                                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg gray"
                                        >
                                            <span>신규 그룹 생성</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="tbl">
                                        <dl>
                                            <dt>
                                                <div className="dt-inner">
                                                    <span className="fz-15 fc-gray-500">
                                                        광고 그룹
                                                    </span>
                                                </div>
                                            </dt>
                                            <dd>
                                                <div className="form-group">
                                                    <div
                                                        className="ant-select css-dev-only-do-not-override-1me4733 ant-select-single ant-select-show-arrow"
                                                        style={{ width: '250px' }}
                                                    >
                                                        <div className="ant-select-selector">
                                                            <span className="ant-select-selection-search">
                                                                <input
                                                                    type="search"
                                                                    autoComplete="off"
                                                                    className="ant-select-selection-search-input"
                                                                    role="combobox"
                                                                    aria-haspopup="listbox"
                                                                    aria-owns="rc_select_3_list"
                                                                    aria-autocomplete="list"
                                                                    aria-controls="rc_select_3_list"
                                                                    aria-activedescendant="rc_select_3_list_0"
                                                                    readOnly
                                                                    unselectable="on"
                                                                    // defaultValue
                                                                    id="rc_select_3"
                                                                    style={{ opacity: 0 }}
                                                                />
                                                            </span>
                                                            <span
                                                                className="ant-select-selection-item"
                                                                title="dghgfh"
                                                            >
                                                                dghgfh
                                                            </span>
                                                        </div>
                                                        <span
                                                            className="ant-select-arrow"
                                                            unselectable="on"
                                                            aria-hidden="true"
                                                            style={{ userSelect: 'none' }}
                                                        >
                                                            <span
                                                                role="img"
                                                                aria-label="down"
                                                                className="anticon anticon-down ant-select-suffix"
                                                            >
                                                                <svg
                                                                    viewBox="64 64 896 896"
                                                                    focusable="false"
                                                                    data-icon="down"
                                                                    width="1em"
                                                                    height="1em"
                                                                    fill="currentColor"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </section>
                            <section className="wrap-section wrap-datagrid">
                                <div className="box-header">
                                    <div className="box-left">
                                        <h2 className="fz-24 fc-gray-700">광고 키워드 리스트</h2>
                                    </div>
                                    <div className="box-right">
                                        <button
                                            type="button"
                                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default pink"
                                        >
                                            <span>키워드 추가</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-default gray"
                                        >
                                            <span>입찰가 일괄 설정</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="ant-table-wrapper css-dev-only-do-not-override-1me4733">
                                        <div className="ant-spin-nested-loading css-dev-only-do-not-override-1me4733">
                                            <div className="ant-spin-container">
                                                <div className="ant-table ant-table-bordered ant-table-empty">
                                                    <div className="ant-table-container">
                                                        <div className="ant-table-content">
                                                            <table style={{ tableLayout: 'auto' }}>
                                                                <colgroup />
                                                                <thead className="ant-table-thead">
                                                                    <tr>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            키워드명
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            입찰가
                                                                        </th>
                                                                        <th
                                                                            className="ant-table-cell"
                                                                            scope="col"
                                                                            style={{
                                                                                textAlign: 'center',
                                                                            }}
                                                                        >
                                                                            키워드 삭제
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody className="ant-table-tbody">
                                                                    <tr className="ant-table-placeholder">
                                                                        <td
                                                                            className="ant-table-cell"
                                                                            colSpan={3}
                                                                        >
                                                                            <div className="css-dev-only-do-not-override-1me4733 ant-empty ant-empty-normal">
                                                                                <div className="ant-empty-image">
                                                                                    <svg
                                                                                        width={64}
                                                                                        height={41}
                                                                                        viewBox="0 0 64 41"
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                    >
                                                                                        <g
                                                                                            transform="translate(0 1)"
                                                                                            fill="none"
                                                                                            fillRule="evenodd"
                                                                                        >
                                                                                            <ellipse
                                                                                                fill="#f5f5f5"
                                                                                                cx={
                                                                                                    32
                                                                                                }
                                                                                                cy={
                                                                                                    33
                                                                                                }
                                                                                                rx={
                                                                                                    32
                                                                                                }
                                                                                                ry={
                                                                                                    7
                                                                                                }
                                                                                            />
                                                                                            <g
                                                                                                fillRule="nonzero"
                                                                                                stroke="#d9d9d9"
                                                                                            >
                                                                                                <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
                                                                                                <path
                                                                                                    d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                                                                                                    fill="#fafafa"
                                                                                                />
                                                                                            </g>
                                                                                        </g>
                                                                                    </svg>
                                                                                </div>
                                                                                <div className="ant-empty-description">
                                                                                    No data
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="box-footer">
                                <div className="box-center">
                                    <button
                                        type="button"
                                        className="ant-btn css-dev-only-do-not-override-1me4733 ant-btn-primary ant-btn-lg ant-btn-block pink"
                                    >
                                        <span>광고 등록</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
