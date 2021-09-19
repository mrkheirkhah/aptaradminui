<template>
  <div class="container">
    <div class="col-md-12">
      <div class="invoice">
        <div
          class="invoice-company text-inverse text-center"
          style="font-size: 24px"
        >
          <strong>صورتحساب فروش کالا و خدمات</strong>
        </div>
        <div class="invoice-header">
          <div class="d-flex" style="flex-direction: column; width: 80%">
            <div class="invoice-from">
              <address class="m-t-5 m-b-5" v-if="invoice && invoice.seller">
                <div>
                  <strong class="text-inverse">فروشنده: </strong>
                  {{ invoice.seller.title }}<br />
                </div>
                <div>
                  <strong class="text-inverse">شناسه ملی: </strong>
                  {{ invoice.seller.nationalCode }}<br />
                </div>
                <div>
                  <strong class="text-inverse">شماره ثبت: </strong>
                  {{ invoice.seller.registerCode }}<br />
                </div>
                <div>
                  <strong class="text-inverse">شماره اقتصادی: </strong>
                  {{ invoice.seller.eNumber }}<br />
                </div>
                <div>
                  <strong class="text-inverse">نشانی شرکت: </strong
                  >{{ invoice.seller.address }}<br />
                </div>
                <div>
                  <strong class="text-inverse">کد پستی: </strong>
                  {{ invoice.seller.postalcode }}<br />
                </div>
                <div>
                  <strong class="text-inverse">تلفن: </strong>
                  {{ invoice.seller.tel }}<br />
                </div>
              </address>
            </div>
            <div class="invoice-to">
              <address class="m-t-5 m-b-5" v-if="invoice && invoice.customer">
                <div>
                  <strong class="text-inverse">خریدار: </strong>
                  {{ invoice.customer.title }}<br />
                </div>
                <div>
                  <strong class="text-inverse">شناسه ملی: </strong>
                  {{ invoice.customer.nationalCode }}<br />
                </div>
                <div>
                  <strong class="text-inverse">شماره ثبت: </strong>
                  {{ invoice.customer.registerCode }}<br />
                </div>
                <div>
                  <strong class="text-inverse"
                    >شماره اقتصادی / شماره ملی:
                  </strong>
                  {{ invoice.customer.code }}<br />
                </div>
                <div>
                  <strong class="text-inverse">نشانی: </strong>
                  {{ invoice.customer.address }}<br />
                </div>
                <div>
                  <strong class="text-inverse">کد پستی: </strong>
                  {{ invoice.customer.postalcode }}<br />
                </div>
                <div>
                  <strong class="text-inverse">شماره تماس: </strong>
                  <span dir="ltr">{{ invoice.customer.tel }}</span
                  ><br />
                </div>
              </address>
            </div>
          </div>
          <div
            class="d-flex"
            style="
              flex-direction: column;
              width: 20%;
              height: 100%;
              min-height: 100%;
            "
            v-if="invoice"
          >
            <div class="invoice-date">
              <div class="m-t-5">
                <strong class="text-inverse">تاریخ: </strong
                >{{
                  new Date(invoice.date).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                }}
              </div>
              <div class="invoice-detail">
                <strong class="text-inverse">شماره فاکتور: </strong
                >{{ invoice.invoiceNumber }}
              </div>
            </div>
            <div class="invoice-date">
              <div class="invoice-detail">
                <strong class="text-inverse">شماره پیگیری: </strong
                >{{ invoice.traceCode }}
              </div>
              <div class="m-t-5">
                <strong class="text-inverse">تاریخ پیگیری: </strong
                >{{
                  new Date(invoice.traceDate).toLocaleString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="invoice-content">
          <div class="table-responsive">
            <table class="table table-invoice">
              <thead>
                <tr>
                  <th class="text-center" id="12" style="width: 5%">ردیف</th>
                  <th class="text-center" id="2" style="width: 5%">کد کالا</th>
                  <th class="text-right" id="3" style="width: 10%">شرح کالا</th>
                  <th class="text-right" id="4" style="width: 10%">تعداد</th>
                  <th class="text-right" id="5" style="width: 10%">
                    مبلغ واحد (تومان)
                  </th>
                  <th class="text-right" id="6" style="width: 12%">
                    مبلغ کل (تومان)
                  </th>
                  <th class="text-right" id="7" style="width: 12%">
                    تخفیف (تومان)
                  </th>
                  <th class="text-right" id="8" style="width: 12%">
                    مبلغ کل پس از تخفیف (تومان)
                  </th>
                  <th class="text-right" id="9" style="width: 12%">
                    جمع مالیات و عوارض (تومان)
                  </th>
                  <th class="text-right" id="10" style="width: 12%">
                    جمع مبلغ کل پس از تخفیف و مالیات و عوارض (تومان)
                  </th>
                </tr>
              </thead>
              <tbody
                v-if="invoice && invoice.items && invoice.items.length > 0"
              >
                <tr v-for="item in invoice.items" :key="item.row">
                  <td class="text-center">{{ item.row }}</td>
                  <td class="text-center">{{ item.productCode }}</td>
                  <td class="text-center">{{ item.title }}</td>
                  <td class="text-right">{{ item.count }}</td>
                  <td class="text-right">
                    {{ item.unitPrice.toLocaleString() }}
                  </td>
                  <td class="text-right">
                    {{ item.totalPrice.toLocaleString() }}
                  </td>
                  <td class="text-right">
                    {{ item.discount.toLocaleString() }}
                  </td>
                  <td class="text-right">
                    {{ item.totalPriceWithDiscount.toLocaleString() }}
                  </td>
                  <td class="text-right">{{ item.tax.toLocaleString() }}</td>
                  <td class="text-right">
                    {{ item.purePrice.toLocaleString() }}
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-invoice">
              <thead>
                <tr v-if="invoice && invoice.summery">
                  <th class="text-right" id="9" style="width: 40%">
                    جمع کل (تومان)
                  </th>
                  <th class="text-right" id="4" style="width: 12%">
                    {{ invoice.summery.totalPrice.toLocaleString() }}
                  </th>
                  <th class="text-right" id="5" style="width: 12%">
                    {{ invoice.summery.discount.toLocaleString() }}
                  </th>
                  <th class="text-right" id="6" style="width: 12%">
                    {{
                      invoice.summery.totalPriceWithDiscount.toLocaleString()
                    }}
                  </th>
                  <th class="text-right" id="7" style="width: 12%">
                    {{ invoice.summery.tax.toLocaleString() }}
                  </th>
                  <th class="text-right" id="8" style="width: 12%">
                    {{ invoice.summery.purePrice.toLocaleString() }}
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="invoice-price">
            <div class="invoice-price-right" style="width: 25%">
              <strong>مهر و امضای فروشنده:</strong>
              <span class="f-w-600"></span>
            </div>
            <div class="invoice-price-left">
              <div class="invoice-price-row">
                <div class="sub-price">
                  <small>ساعت تحویل:</small>
                  <span style="font-size: 14px">{{
                    new Date(invoice.deliveryDateTime).toLocaleString("fa-IR", {
                      hour: "2-digit",
                      second: "2-digit",
                      minute: "2-digit",
                    })
                  }}</span>
                </div>
                <div class="sub-price">
                  <small>تاریخ تحویل:</small>
                  <span style="font-size: 14px">{{
                    new Date(invoice.deliveryDateTime).toLocaleString("fa-IR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                  }}</span>
                </div>
              </div>
            </div>
            <div class="invoice-price-right" style="width: 25%">
              <strong>مهر و امضای خریدار:</strong>
              <span class="f-w-600"></span>
            </div>
          </div>
        </div>
        <div class="text-center">
          <span
            class="pull-right hidden-print"
            style="display: block; margin: 15px auto"
          >
            <a
              href="javascript:;"
              onclick="window.print()"
              class="btn btn-sm btn-white m-b-10 p-l-5"
              style="background-color: #f0f3f4"
            >
              خروجی PDF</a
            >
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { invoice } from "../../services/order";
export default {
  data() {
    return {
      invoice: {},
    };
  },
  methods: {
    async fetchInfo() {
      try {
        const { data } = await invoice(this.$route.params.id);
        this.invoice = { ...data };
      } catch (ex) {
        console.log(ex);
      }
      this.loader.hide();
    },
  },
  created() {
    this.loader = this.$loading.show({
      loader: "bars",
      color: "#3399FF",
      blur: "100px",
      opacity: 0.65,
      "lock-scroll": "true",
      "can-cancel": "false",
      "is-full-page": "true",
    });
    this.fetchInfo();
  },
};
</script>

<style lang="scss" scoped>
.invoice {
  background: #fff;
  padding: 20px;
}

.invoice-company {
  font-size: 20px;
}

.invoice-header {
  margin: 0 -20px;
  background: #fff;
  padding: 20px;
  min-height: 120px;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: row;
}

.invoice-date {
  display: table-cell;
  display: flex;
  flex-direction: column;
  width: 20%;
  border: 1px solid #d9dfe3;
}
.invoice-from,
.invoice-to {
  display: table-cell;
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid #d9dfe3;
}

.invoice-from,
.invoice-to {
  padding-right: 20px;
  padding-left: 20px;
}

.invoice-from address,
.invoice-to address {
  line-height: 35px;
  flex-wrap: wrap;
  height: 50%;
  display: flex;
  flex-direction: row;
}

.invoice-from address div,
.invoice-to address div {
  margin: 0 20px;
}

.invoice-date .date,
.invoice-from strong,
.invoice-to strong {
  font-size: 16px;
  font-weight: 600;
}

.invoice-date {
  width: 100%;
  height: 50%;
  min-height: 88px;
  text-align: right;
  padding-left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}

.invoice-date div {
  width: 100%;
  margin: 5px 0;
  display: flex;
  justify-content: space-around;
}

.invoice-price {
  background: #fff;
  border: 1px solid #d9dfe3;
  display: table;
  width: 100%;
}

.invoice-price .invoice-price-left,
.invoice-price .invoice-price-right {
  display: table-cell;
  padding: 20px;
  font-size: 20px;
  font-weight: 600;
  width: 50%;
  position: relative;
  vertical-align: middle;
}

.invoice-price .invoice-price-left .sub-price {
  max-width: 400px;
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
}

.invoice-price small {
  font-size: 12px;
  font-weight: 400;
  display: block;
}

.invoice-price .invoice-price-row {
  display: flex;
  flex-direction: column;
}

.invoice-price .invoice-price-right {
  width: 25%;
  color: #fff;
  font-size: 28px;
  text-align: right;
  vertical-align: bottom;
  font-weight: 300;
}

.invoice-price .invoice-price-right strong {
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
}

.invoice-footer {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  font-size: 10px;
}

.invoice-note {
  color: #999;
  margin-top: 80px;
  font-size: 85%;
}

.invoice > div:not(.invoice-footer) {
  margin-bottom: 20px;
}

td,
th {
  border: 1.5px solid #d9dfe3;
}

.table {
  margin-bottom: 0;
}

.btn.btn-white,
.btn.btn-white.disabled,
.btn.btn-white.disabled:focus,
.btn.btn-white.disabled:hover,
.btn.btn-white[disabled],
.btn.btn-white[disabled]:focus,
.btn.btn-white[disabled]:hover {
  color: #2d353c;
  background: #fff;
  border-color: #d9dfe3;
}

@media print {
  .hidden-print {
    display: none;
    visibility: hidden;
  }

  @page {
    size: landscape;
  }
  body {
    writing-mode: tb-rl;
  }
}
</style>

<style type="text/css" media="print" scoped>
@page {
  size: landscape;
}
body {
  writing-mode: tb-rl;
}

.hidden-print {
  display: none;
}
</style>