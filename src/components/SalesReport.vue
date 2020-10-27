<template>
  <div>
    <Pivot
      ref="pivotSales"
      v-bind:toolbar="true"
      v-bind:report="{}"
    >
    </Pivot>
    <h3 class="salesTitle">Annual Revenue by Retail Categories</h3>
    <Pivot
      id="salesCharts"
      ref="pivotChartSales"
      v-bind:toolbar="false"
      v-bind:report="{}"
    >
    </Pivot>
  </div>
</template>
<script>
import OrderService from '@/api/order.service'
export default {
     name:'SalesReport',
     mounted(){
    OrderService.getAll()
        .then((response) => {
            const responseData = response.data
            const report = {
                dataSource: {
                    type: 'json',
                    data: responseData,
                    mapping: {
                        orderId: {
                            type: 'string',
                            caption: 'Order ID',
                        },
                        country: {
                            type: 'string',
                            caption: 'Country',
                        },
                        city: {
                            type: 'string',
                            caption: 'City',
                        },
                        orderDate: {
                            type: 'date',
                            caption: 'Order Date',
                        },
                        contactName: {
                            type: 'string',
                            caption: 'Contact Name',
                        },
                        quantity: {
                            type: 'number',
                            caption: 'Quantity',
                        },
                        retailCategory: {
                            type: 'string',
                            caption: 'Retail Category',
                        },
                        price: {
                            type: 'number',
                            caption: 'Price',
                        },
                    },
                },
                slice: {
                    rows: [{
                            uniqueName: 'country',
                        },
                        {
                            uniqueName: 'retailCategory',
                        },
                    ],
                    columns: [{
                            uniqueName: 'orderDate.Year',
                        },
                        {
                            uniqueName: '[Measures]',
                        },
                    ],
                    measures: [{
                            uniqueName: 'price',
                            aggregation: 'sum',
                        },
                        {
                            uniqueName: 'quantity',
                            aggregation: 'sum',
                        },
                    ],
                    expands: {
                        rows: [{
                                tuple: ['country.[australia]'],
                            },
                            {
                                tuple: ['country.[japan]'],
                            },
                            {
                                tuple: ['country.[norway]'],
                            },
                        ],
                    },
                },
            }
            this.$refs.pivotSales.flexmonster.setReport(report)
            const pivotChartReport = {
                dataSource: {
                    type: 'json',
                    data: responseData,
                    mapping: {
                        orderId: {
                            type: 'string',
                            caption: 'Order ID',
                        },
                        country: {
                            type: 'string',
                            caption: 'Country',
                        },
                        city: {
                            type: 'string',
                            caption: 'City',
                        },
                        orderDate: {
                            type: 'date',
                            caption: 'Order Date',
                        },
                        contactName: {
                            type: 'string',
                            caption: 'Contact Name',
                        },
                        quantity: {
                            type: 'number',
                            caption: 'Quantity',
                        },
                        retailCategory: {
                            type: 'string',
                            caption: 'Retail Category',
                        },
                        price: {
                            type: 'number',
                            caption: 'Price',
                        },
                    },
                },
                slice: {
                    rows: [{
                        uniqueName: 'retailCategory',
                    }, ],
                    columns: [{
                            uniqueName: 'orderDate.Year',
                        },
                        {
                            uniqueName: '[Measures]',
                        },
                    ],
                    measures: [{
                        uniqueName: 'Revenue',
                        formula: "sum('price') * sum('quantity')",
                        individual: true,
                        caption: 'Revenue',
                        format: '-46ca9u7j6jy00',
                    }, ],
                    sorting: {
                        column: {
                            type: 'asc',
                            tuple: [],
                            measure: {
                                uniqueName: 'Revenue',
                            },
                        },
                    },
                },
                options: {
                    viewType: 'charts',
                    chart: {
                        type: 'bar_h',
                    },
                },
                formats: [{
                    name: '-46ca9u7j6jy00',
                    currencySymbol: '$',
                }, ],
            }
            this.$refs.pivotChartSales.flexmonster.setReport(pivotChartReport)
        })
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.log("The data hasn't been loaded", error);
        })
},
}
</script>