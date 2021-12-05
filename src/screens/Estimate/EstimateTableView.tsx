import React from 'react';
import { format } from 'date-fns';
import { View, Pressable, ScrollView } from 'react-native';
import { Text, useTheme, Button, List } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { RootState } from '../../store';
import { EstimateForm, EstimateItem } from '../../types';
import styles from './Estimate.style';

const EstimateTableView = () => {
  const formVal: EstimateForm = useSelector(
    (state: RootState) => state.estimate,
  );

  const getCustomerView = () => {
    const { customer } = formVal;
    const dateStr = format(new Date(), 'dd-MM-yyyy');

    return (
      <View style={styles.customerContainer}>
        <View style={[styles.headerTextContainer]}>
          <Text style={styles.customerFont}>Customer Info</Text>
        </View>
        <View style={styles.customerInfoContainer}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerFont}>Name: {customer.name}</Text>
            <Text style={styles.customerFont}>Phone: {customer.mobile}</Text>
          </View>
          <View style={[styles.customerInfo, { alignItems: 'flex-end' }]}>
            <Text style={styles.customerFont}>Date: {dateStr}</Text>
            <Text style={styles.customerFont}>Place: {customer.area}</Text>
          </View>
        </View>
      </View>
    );
  };

  const getEstimateView = () => {
    let slNo = 0;
    const typesObj: Record<string, EstimateItem[]> = {};
    const { estimateItems } = formVal;
    estimateItems.forEach((obj: EstimateItem) => {
      if (typesObj[obj.type]) typesObj[obj.type].push(obj);
      else typesObj[obj.type] = [obj];
    });

    return (
      <View style={styles.estimateData}>
        <View style={[styles.dataHeader]}>
          <Text style={styles.customerFont}>Items</Text>
        </View>
        <View style={styles.dataList}>
          {Object.keys(typesObj).map(type => (
            <List.Section key={type}>
              <List.Subheader>{type}</List.Subheader>
              {typesObj[type].map(dataObj => (
                <List.Item
                  title={`${dataObj.item} ${dataObj.spec}`}
                  left={() => <Text style={styles.slNo}>{`${++slNo}.`}</Text>}
                  right={() => (
                    <Text style={styles.count}>{`${dataObj.count}`}</Text>
                  )}
                  description={`Part no: SWE123FSS`}
                  key={`${type}_${dataObj.item}_${dataObj.spec}`}
                />
              ))}
            </List.Section>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.estimateView}>
      {getCustomerView()}
      {getEstimateView()}
    </View>
  );
};

export default EstimateTableView;
