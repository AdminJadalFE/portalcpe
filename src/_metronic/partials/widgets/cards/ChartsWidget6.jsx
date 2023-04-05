/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef} from 'react'
import ApexCharts  from 'apexcharts'
import {getCSSVariableValue} from '../../../assets/ts/_utils' 
import moment from 'moment'; 
 
const ChartsWidget6 = ({className, chartColor, chartHeight, tiposCpe, totalesCpe, rechazadosCpe, pendientesCpe, erroresCpe, totalCpe}) => {
  
  const fechaDesde = moment().startOf('month').format('DD-MM-YYYY'); 
  const fechaHasta = moment().endOf('month').format('DD-MM-YYYY'); 

  const chartRef = useRef(null)
  const refreshChart = () => {
    if (!chartRef.current) {
      return
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight, tiposCpe, totalesCpe, rechazadosCpe, pendientesCpe, erroresCpe))
    if (chart) {
      chart.render()
    }

    return chart
  }

  useEffect(() => {
    const chart = refreshChart()

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartRef])

  return (
    <div className={`card ${className}`}>
      {/* begin::Body */}
      <div className='card-body p-0 d-flex justify-content-between flex-column overflow-hidden'>
        {/* begin::Hidden */}
        <div className='d-flex flex-stack flex-wrap flex-grow-1 px-9 pt-9 pb-3'>
          <div className='me-2'>
            <span className='fw-bold text-gray-800 d-block fs-3'>Total Comprobantes Emitidos</span>

            <span className='text-gray-400 fw-semibold'>{fechaDesde} - {fechaHasta}</span>
          </div>

          <div className={`fw-bold fs-3 text-${chartColor}`}>{totalCpe}</div>
        </div>
        {/* end::Hidden */}

        {/* begin::Chart */}
        <div ref={chartRef} className='mixed-widget-10-chart'></div>
        {/* end::Chart */}
      </div>
    </div>
  )
}

const chartOptions = (chartColor, chartHeight, tiposCpe, totalesCpe, rechazadosCpe, pendientesCpe, erroresCpe) => {

  
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200') 
  const baseColor = getCSSVariableValue('--kt-' + 'success')
  const rechazoColor = getCSSVariableValue('--kt-' + 'danger')
  const errorColor = getCSSVariableValue('--kt-' + 'warning')

  return {
    series: [
      {
        name: 'Aceptados',
        data: totalesCpe,
      },
      {
        name: 'Rechazados',
        data: rechazadosCpe,
      },      
      {
        name: 'Errores',
        data: erroresCpe,
      },
      {
        name: 'Pendientes',
        data: pendientesCpe,
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: chartHeight,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: tiposCpe,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      type: 'solid',
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return   val + ' CPE'
        },
      },
    },
    colors: [baseColor, rechazoColor, errorColor],
    grid: {
      padding: {
        top: 10,
      },
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}

export {ChartsWidget6}
