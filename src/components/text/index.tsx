import React from 'react';
import { StyleSheet, Text as NativeText, TextProps } from 'react-native';

const Text: React.FC<TextProps> = ({ children, style }) => {
  return <NativeText style={[styles.text, style]}>{children}</NativeText>;
};

const styles = StyleSheet.create({
  text: {},
});

export default Text;
