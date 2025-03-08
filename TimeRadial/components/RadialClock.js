import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Circle, Text, Line, G } from 'react-native-svg';
import moment from 'moment';

const { width } = Dimensions.get('window');
const CLOCK_SIZE = width - 40;
const CENTER_X = CLOCK_SIZE / 2;
const CENTER_Y = CLOCK_SIZE / 2;
const RADIUS = CLOCK_SIZE / 2 - 20;

const RadialClock = ({ tasks }) => {
  const getCoordinates = (hour, minute) => {
    const angle = ((hour + minute / 60) * 30 - 90) * (Math.PI / 180);
    return {
      x: CENTER_X + RADIUS * Math.cos(angle),
      y: CENTER_Y + RADIUS * Math.sin(angle)
    };
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={CLOCK_SIZE} height={CLOCK_SIZE}>
        {/* Clock face */}
        <Circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={RADIUS}
          stroke="#333"
          strokeWidth="2"
          fill="none"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = ((i * 30) - 90) * (Math.PI / 180);
          const x1 = CENTER_X + (RADIUS - 10) * Math.cos(angle);
          const y1 = CENTER_Y + (RADIUS - 10) * Math.sin(angle);
          const x2 = CENTER_X + RADIUS * Math.cos(angle);
          const y2 = CENTER_Y + RADIUS * Math.sin(angle);

          return (
            <Line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#333"
              strokeWidth="2"
            />
          );
        })}

        {/* Tasks */}
        {tasks.map((task, index) => {
          const startTime = moment(task.startDate);
          const { x, y } = getCoordinates(
            startTime.hours(),
            startTime.minutes()
          );

          return (
            <G key={index}>
              <Circle
                cx={x}
                cy={y}
                r={5}
                fill={task.color || '#007AFF'}
              />
              <Text
                x={x + 10}
                y={y}
                fill="#333"
                fontSize="12"
                textAnchor="start"
              >
                {task.title}
              </Text>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

export default RadialClock; 