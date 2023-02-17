import { INewExpenseEmailParams } from 'src/interfaces/messaging/messaging.interface';

export const newExpenseEmail = (params: INewExpenseEmailParams): string => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html
  data-editor-version="2"
  class="sg-campaigns"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {
          width: 600px;
          margin: 0 auto;
        }
        table {
          border-collapse: collapse;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
      </style>
    <![endif]-->
    <style type="text/css">
      body,
      p,
      div {
        font-family: inherit;
        font-size: 14px;
      }
      body {
        color: #000000;
      }
      body a {
        color: #1188e6;
        text-decoration: none;
      }
      p {
        margin: 0;
        padding: 0;
      }
      table.wrapper {
        width: 100% !important;
        table-layout: fixed;
        -webkit-font-smoothing: antialiased;
        -webkit-text-size-adjust: 100%;
        -moz-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      img.max-width {
        max-width: 100% !important;
      }
      .column.of-2 {
        width: 50%;
      }
      .column.of-3 {
        width: 33.333%;
      }
      .column.of-4 {
        width: 25%;
      }
      ul ul ul ul {
        list-style-type: disc !important;
      }
      ol ol {
        list-style-type: lower-roman !important;
      }
      ol ol ol {
        list-style-type: lower-latin !important;
      }
      ol ol ol ol {
        list-style-type: decimal !important;
      }
      @media screen and (max-width: 480px) {
        .preheader .rightColumnContent,
        .footer .rightColumnContent {
          text-align: left !important;
        }
        .preheader .rightColumnContent div,
        .preheader .rightColumnContent span,
        .footer .rightColumnContent div,
        .footer .rightColumnContent span {
          text-align: left !important;
        }
        .preheader .rightColumnContent,
        .preheader .leftColumnContent {
          font-size: 80% !important;
          padding: 5px 0;
        }
        table.wrapper-mobile {
          width: 100% !important;
          table-layout: fixed;
        }
        img.max-width {
          height: auto !important;
          max-width: 100% !important;
        }
        a.bulletproof-button {
          display: block !important;
          width: auto !important;
          font-size: 80%;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .columns {
          width: 100% !important;
        }
        .column {
          display: block !important;
          width: 100% !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        .social-icon-column {
          display: inline-block !important;
        }
      }
    </style>
    <!--user entered Head Start-->
    <link
      href="https://fonts.googleapis.com/css?family=Chivo&display=swap"
      rel="stylesheet"
    />
    <style>
      body {
        font-family: 'Chivo', sans-serif;
      }
    </style>
    <!--End Head user entered-->
  </head>
  <body>
    <center
      class="wrapper"
      data-link-color="#1188E6"
      data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;"
    >
      <div class="webkit">
        <table
          cellpadding="0"
          cellspacing="0"
          border="0"
          width="100%"
          class="wrapper"
          bgcolor="#FFFFFF"
        >
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table
                width="100%"
                role="content-container"
                class="outer"
                align="center"
                cellpadding="0"
                cellspacing="0"
                border="0"
              >
                <tr>
                  <td width="100%">
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                    >
                      <tr>
                        <td>
                          <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="width: 100%; max-width: 600px"
                            align="center"
                          >
                            <tr>
                              <td
                                role="modules-container"
                                style="
                                  padding: 0px 0px 0px 0px;
                                  color: #000000;
                                  text-align: left;
                                "
                                bgcolor="#FFFFFF"
                                width="100%"
                                align="left"
                              >
                                <table
                                  class="module preheader preheader-hide"
                                  role="module"
                                  data-type="preheader"
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  style="
                                    display: none !important;
                                    mso-hide: all;
                                    visibility: hidden;
                                    opacity: 0;
                                    color: transparent;
                                    height: 0;
                                    width: 0;
                                  "
                                >
                                  <tr>
                                    <td role="module-content">
                                      <p></p>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  align="center"
                                  width="100%"
                                  role="module"
                                  data-type="columns"
                                  style="padding: 30px 20px 30px 30px"
                                  bgcolor="#f7f9f5"
                                  data-distribution="1,1"
                                  border-radius="6px"
                                >
                                  <tbody>
                                    <tr role="module-content">
                                      <td height="100%" valign="top">
                                        <table
                                          width="265"
                                          style="
                                            width: 265px;
                                            border-spacing: 0;
                                            border-collapse: collapse;
                                            margin: 0px 10px 0px 0px;
                                          "
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="left"
                                          border="0"
                                          bgcolor=""
                                          class="column column-0"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="
                                                  padding: 0px;
                                                  margin: 0px;
                                                  border-spacing: 0;
                                                "
                                              >
                                                <table
                                                  class="wrapper"
                                                  role="module"
                                                  data-type="image"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  width="100%"
                                                  style="table-layout: fixed"
                                                  data-muid="9bb94d6b-a9d9-4d66-b867-f52241c7c7c5"
                                                ></table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          class="module"
                                          role="module"
                                          data-type="divider"
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          width="100%"
                                          style="table-layout: fixed"
                                          data-muid="2d3862ba-e4da-4865-8605-53fb723d695b"
                                        >
                                          <tbody>
                                            <tr>
                                              <td
                                                style="padding: 0px 0px 0px 0px"
                                                role="module-content"
                                                height="100%"
                                                valign="top"
                                                bgcolor=""
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  align="center"
                                                  width="100%"
                                                  height="1px"
                                                  style="
                                                    line-height: 1px;
                                                    font-size: 1px;
                                                  "
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px 0px 1px
                                                            0px;
                                                        "
                                                        bgcolor="#e2efd4"
                                                      ></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <table
                                          border="0"
                                          cellpadding="0"
                                          cellspacing="0"
                                          align="center"
                                          width="100%"
                                          role="module"
                                          data-type="columns"
                                          style="padding: 30px 20px 40px 30px"
                                          bgcolor="#f7f9f5"
                                          data-distribution="1"
                                        >
                                          <tbody>
                                            <tr role="module-content">
                                              <td height="100%" valign="top">
                                                <table
                                                  width="530"
                                                  style="
                                                    width: 530px;
                                                    border-spacing: 0;
                                                    border-collapse: collapse;
                                                    margin: 0px 10px 0px 10px;
                                                  "
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                  align="left"
                                                  border="0"
                                                  bgcolor=""
                                                  class="column column-0"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        style="
                                                          padding: 0px;
                                                          margin: 0px;
                                                          border-spacing: 0;
                                                        "
                                                      >
                                                        <table
                                                          class="module"
                                                          role="module"
                                                          data-type="text"
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          width="100%"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          data-muid="6cf92250-86a4-41d8-865a-ae5fb2569556"
                                                          data-mc-module-version="2019-10-22"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 18px
                                                                    0px 18px 0px;
                                                                  line-height: 22px;
                                                                  text-align: inherit;
                                                                "
                                                                height="100%"
                                                                valign="top"
                                                                bgcolor=""
                                                                role="module-content"
                                                              >
                                                                <div>
                                                                  <div
                                                                    style="
                                                                      font-family: inherit;
                                                                      text-align: center;
                                                                      font-size: 1.2rem;
                                                                    "
                                                                  >
                                                                    <strong>OnExpenses</strong>
                                                                  </div>
                                                                  <div></div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          class="module"
                                                          role="module"
                                                          data-type="text"
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          width="100%"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          data-muid="8c54c8a5-caee-4b33-b6b0-e8aaed51c545"
                                                          data-mc-module-version="2019-10-22"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 18px
                                                                    10px 18px
                                                                    10px;
                                                                  line-height: 32px;
                                                                  text-align: inherit;
                                                                "
                                                                height="100%"
                                                                valign="top"
                                                                bgcolor=""
                                                                role="module-content"
                                                              >
                                                                <div>
                                                                  <div
                                                                    style="
                                                                      font-family: inherit;
                                                                      text-align: center;
                                                                    "
                                                                  >
                                                                    <span
                                                                      style="
                                                                        color: #9966ff;
                                                                        font-size: 50px;
                                                                      "
                                                                      >Nova
                                                                      despesa
                                                                      cadastrada!</span
                                                                    >
                                                                  </div>
                                                                  <div></div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          class="module"
                                                          role="module"
                                                          data-type="text"
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          width="100%"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          data-muid="6cf92250-86a4-41d8-865a-ae5fb2569556.1"
                                                          data-mc-module-version="2019-10-22"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    0px 18px 0px;
                                                                  line-height: 22px;
                                                                  text-align: inherit;
                                                                "
                                                                height="100%"
                                                                valign="top"
                                                                bgcolor=""
                                                                role="module-content"
                                                              >
                                                                <div>
                                                                  <div
                                                                    style="
                                                                      font-family: inherit;
                                                                      text-align: center;
                                                                    "
                                                                  >
                                                                    Despesa com
                                                                    o nome: <strong> ${params.expense.description} </strong> e
                                                                    id <strong> ${params.expense.id} </strong> foi
                                                                    cadastrada
                                                                    agora mesmo!
                                                                  </div>
                                                                  <div
                                                                    style="
                                                                      font-family: inherit;
                                                                      text-align: center;
                                                                    "
                                                                  ></div>
                                                                  <div></div>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          class="module"
                                                          data-role="module-button"
                                                          data-type="button"
                                                          role="module"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          width="100%"
                                                          data-muid="4bcb53df-57db-48a5-9aa3-4060ac494a64"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                align="center"
                                                                bgcolor=""
                                                                class="outer-td"
                                                                style="
                                                                  padding: 0px
                                                                    0px 0px 0px;
                                                                "
                                                              >
                                                                <table
                                                                  border="0"
                                                                  cellpadding="0"
                                                                  cellspacing="0"
                                                                  class="wrapper-mobile"
                                                                  style="
                                                                    text-align: center;
                                                                  "
                                                                >
                                                                  <tbody>
                                                                    <tr>
                                                                      <td
                                                                        align="center"
                                                                        bgcolor="#333333"
                                                                        class="inner-td"
                                                                        style="
                                                                          border-radius: 6px;
                                                                          font-size: 16px;
                                                                          text-align: center;
                                                                          background-color: inherit;
                                                                        "
                                                                      >
                                                                        <a
                                                                          href="http://localhost:3000/api#/Despesas%20(Relacionadas%20ao%20usuário%20logado)/ExpenseController_getById"
                                                                          style="
                                                                            background-color: #333333;
                                                                            border: 1px
                                                                              solid
                                                                              #333333;
                                                                            border-color: #333333;
                                                                            border-width: 1px;
                                                                            color: #ffffff;
                                                                            display: inline-block;
                                                                            font-size: 14px;
                                                                            font-weight: normal;
                                                                            letter-spacing: 0px;
                                                                            line-height: normal;
                                                                            padding: 12px
                                                                              30px
                                                                              12px
                                                                              30px;
                                                                            text-align: center;
                                                                            text-decoration: none;
                                                                            border-style: solid;
                                                                            border-radius: 6px;
                                                                          "
                                                                          target="_blank"
                                                                          >Ver
                                                                          Detalhes</a
                                                                        >
                                                                      </td>
                                                                    </tr>
                                                                  </tbody>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          class="module"
                                                          role="module"
                                                          data-type="spacer"
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          width="100%"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          data-muid="2edb1546-1598-49eb-995c-baf7d429f31c"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    0px 30px 0px;
                                                                "
                                                                role="module-content"
                                                                bgcolor=""
                                                              ></td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          class="wrapper"
                                                          role="module"
                                                          data-type="image"
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          width="100%"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          data-muid="3923e4a3-acc3-4c88-bb58-8e5cd32f0162"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  font-size: 6px;
                                                                  line-height: 10px;
                                                                  padding: 0px
                                                                    0px 0px 0px;
                                                                "
                                                                valign="top"
                                                                align="center"
                                                              >
                                                                <img
                                                                  class="max-width"
                                                                  border="0"
                                                                  style="
                                                                    display: block;
                                                                    color: #000000;
                                                                    text-decoration: none;
                                                                    font-family: Helvetica,
                                                                      arial,
                                                                      sans-serif;
                                                                    font-size: 16px;
                                                                    max-width: 50% !important;
                                                                    width: 70%;
                                                                    height: auto !important;
                                                                  "
                                                                  width="NaN"
                                                                  alt=""
                                                                  data-proportionally-constrained="true"
                                                                  data-responsive="true"
                                                                  src="https://cdn-icons-png.flaticon.com/512/9635/9635073.png"
                                                                />
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                        <table
                                                          class="module"
                                                          role="module"
                                                          data-type="spacer"
                                                          border="0"
                                                          cellpadding="0"
                                                          cellspacing="0"
                                                          width="100%"
                                                          style="
                                                            table-layout: fixed;
                                                          "
                                                          data-muid="2edb1546-1598-49eb-995c-baf7d429f31c.1"
                                                        >
                                                          <tbody>
                                                            <tr>
                                                              <td
                                                                style="
                                                                  padding: 0px
                                                                    0px 30px 0px;
                                                                "
                                                                role="module-content"
                                                                bgcolor=""
                                                              ></td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              bgcolor=""
                                              class="outer-td"
                                              style="padding: 0px 0px 20px 0px"
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                class="wrapper-mobile"
                                                style="text-align: center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      bgcolor="#f5f8fd"
                                                      class="inner-td"
                                                      style="
                                                        border-radius: 6px;
                                                        font-size: 16px;
                                                        text-align: center;
                                                        background-color: inherit;
                                                      "
                                                    >
                                                      <a
                                                        href="https://sendgrid.com/"
                                                        style="
                                                          background-color: #f5f8fd;
                                                          border: 1px solid
                                                            #f5f8fd;
                                                          border-color: #f5f8fd;
                                                          border-radius: 25px;
                                                          border-width: 1px;
                                                          color: #a8b9d5;
                                                          display: inline-block;
                                                          font-size: 10px;
                                                          font-weight: normal;
                                                          letter-spacing: 0px;
                                                          line-height: normal;
                                                          padding: 5px 18px 5px
                                                            18px;
                                                          text-align: center;
                                                          text-decoration: none;
                                                          border-style: solid;
                                                          font-family: helvetica,
                                                            sans-serif;
                                                        "
                                                        target="_blank"
                                                        >MADE WITH ♥ BY ON
                                                        EXPENSES | ARTHUR
                                                        RIBEIRO</a
                                                      >
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>

`;
};
