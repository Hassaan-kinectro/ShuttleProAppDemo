import React, {Component} from 'react';
import {View, Text, StyleSheet, processColor} from 'react-native';
import {Styles, Colors} from '../../../styles';
import {CombinedChart} from 'react-native-charts-wrapper';
import {useTheme} from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
});

class Combined extends Component {
  constructor(props) {
    super();
    this.state = {
      legend: {
        enabled: true,
        textSize: 12,
        textColor: processColor(props.colors.textColor),
        form: 'LINE',
        formSize: 12,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 1,
        verticalAlignment: 'BOTTOM',
        orientation: 'HORIZONTAL',
        horizontalAlignment: 'LEFT',
        direction: 'LEFT_TO_RIGHT',
      },

      xAxis: {
        valueFormatter: props.xAxis,
        granularityEnabled: true,
        granularity: 1,
        // avoidFirstLastClipping: true,
        textColor: processColor(props.colors.textColor),
      },

      yAxis: {
        left: {
          textColor: processColor(props.colors.textColor),
          granularityEnabled: true,
          // granularity: 10,
        },
        right: {
          textColor: processColor(props.colors.textColor),
          granularityEnabled: true,
          // granularity: 100,
        },
      },

      marker: {
        enabled: true,
        markerColor: processColor(Colors.DODGER_BLUE),
        textColor: processColor(props.colors.textColor),
        markerFontSize: 14,
      },

      data: {
        barData: {
          dataSets: [
            {
              values: props.yAxis,
              label: 'Number Of Orders',
              config: {
                colors: [processColor(Colors.SECONDARY_2)],
                valueTextColor: processColor(props.colors.textColor),
                barShadowColor: processColor(Colors.GRAYLIGHT),
                highlightAlpha: 90,
                highlightColor: processColor(Colors.DANGER),
              },
            },
          ],
          config: {
            barWidth: 0.6,
          },
        },
        lineData: {
          dataSets: [
            {
              values: props.Booked,
              label: 'Total Amount Booked',

              config: {
                drawValues: false,
                colors: [processColor(Colors.GREEN)],
                mode: 'CUBIC_BEZIER',
                drawCircles: true,
                circleRadius: 5,
                circleColor: processColor(Colors.GREEN),
                circleHoleColor: processColor(Colors.GREEN),
                lineWidth: 1,
                drawFilled: true,
                axisDependency: 'RIGHT',
                fillColor: processColor(Colors.GREEN),
                fillAlpha: 50,
              },
            },
            {
              values: props.Delivered,
              label: 'Total Amount Delivered',

              config: {
                drawValues: false,
                colors: [processColor(Colors.CURIOUS_BLUE)],
                mode: 'CUBIC_BEZIER',
                drawCircles: true,
                drawFilled: true,
                circleRadius: 5,
                circleColor: processColor(Colors.CURIOUS_BLUE),
                circleHoleColor: processColor(Colors.CURIOUS_BLUE),
                // fillGradient: {
                //   colors: [processColor('blue'), processColor('red')],
                //   positions: [0, 0.5],
                //   angle: 90,
                //   orientation: 'TOP_BOTTOM',
                // },
                fillColor: processColor(Colors.CURIOUS_BLUE),
                fillAlpha: 50,
                axisDependency: 'RIGHT',
                lineWidth: 2,
              },
            },
          ],
        },
      },
      description: {
        text: '',
        textSize: 10,
        textColor: processColor('darkgray'),
      },
    };
  }

  componentDidMount() {
    // in this example, there are line, bar, candle, scatter, bubble in this combined chart.
    // according to MpAndroidChart, the default data sequence is line, bar, scatter, candle, bubble.
    // so 4 should be used as dataIndex to highlight bubble data.

    // if there is only bar, bubble in this combined chart.
    // 1 should be used as dataIndex to highlight bubble data.

    this.setState({
      ...this.state,
      //   highlights: [
      //     {x: 1, y: 150, dataIndex: 4},
      //     {x: 2, y: 106, dataIndex: 4},
      //   ],
    });
  }

  static displayName = 'Combined';

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({...this.state, selectedEntry: null});
    } else {
      this.setState({...this.state, selectedEntry: JSON.stringify(entry)});
    }
  }
  render() {
    const {height, width} = this.props;

    return (
      <View style={{height: height, width: width}}>
        <View style={styles.container}>
          <CombinedChart
            data={this.state.data}
            legend={this.state.legend}
            xAxis={this.state.xAxis}
            yAxis={this.state.yAxis}
            chartDescription={this.state.description}
            visibleRange={{
              x: {
                min: 5,
                max: 5,
              },
            }}
            onSelect={this.handleSelect.bind(this)}
            onChange={event => console.log(event.nativeEvent)}
            marker={this.state.marker}
            highlights={this.state.highlights}
            highlightFullBarEnabled={false}
            drawOrder={['BAR', 'LINE']} //BAR
            style={styles.container}
          />
        </View>
      </View>
    );
  }
}

const CombinedCharts = props => {
  const {colors} = useTheme();

  return <Combined {...props} colors={colors} />;
};

export default CombinedCharts;
