import React, { Fragment, useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Text,
  IconButton,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { addToEstimate } from '../../store/actions';
import AddMinusButton from '../../components/AddMinusButton';
import { materialSpecList } from '../../utils/materialSpecList';
import {
  MaterialType,
  MaterialItem,
  Materials,
  FormValue,
  MaterialSpec,
} from '../../types';
import styles from './Estimate.style';

const MaterialSpecView = ({
  type,
  item,
  saveFormAndClose,
}: {
  type: MaterialType | undefined;
  item: MaterialItem | undefined;
  saveFormAndClose: Function;
}) => {
  const dispatch = useDispatch();
  const { dark, colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [itemInfo, setItemInfo] = useState({ type, item });
  const formVal: FormValue = useSelector((state: RootState) => state.estimate);

  // Get Count Value from the form.
  const getCountValue = ({ id }: MaterialSpec) => {
    if (formVal?.length) {
      const countIndex = formVal.findIndex(
        formValObj =>
          formValObj?.typeId === itemInfo?.type?.id &&
          formValObj?.itemId === itemInfo?.item?.id &&
          formValObj?.specId === id,
      );
      if (countIndex >= 0) return formVal[countIndex]?.count;
    }
    return 0;
  };

  // Update the count values.
  const updateCountValue = ({ material, count }: Materials) => {
    if (formVal?.length) {
      const newMaterials = [...formVal];
      const deleteIndex = newMaterials.findIndex(
        formValObj =>
          formValObj?.typeId === itemInfo?.type?.id &&
          formValObj?.itemId === itemInfo?.item?.id &&
          formValObj?.specId === material?.id,
      );
      if (deleteIndex >= 0) newMaterials.splice(deleteIndex, 1);
      newMaterials.push({
        typeId: itemInfo?.type?.id || '',
        type: itemInfo?.type?.name || '',
        itemId: itemInfo?.item?.id || '',
        item: itemInfo?.item?.name || '',
        count: count || 0,
        specId: material?.id || '',
        spec: material?.name || '',
      });
      saveToFormValue(newMaterials);
    } else {
      saveToFormValue([
        {
          typeId: itemInfo?.type?.id || '',
          type: itemInfo?.type?.name || '',
          itemId: itemInfo?.item?.id || '',
          item: itemInfo?.item?.name || '',
          count: count || 0,
          specId: material?.id || '',
          spec: material?.name || '',
        },
      ]);
    }
  };

  // Saves the form by dispatch.
  const saveToFormValue = (estimateItems: FormValue) => {
    dispatch(addToEstimate(estimateItems));
  };

  useEffect(() => {
    setLoading(true);
    setItemInfo({ type, item });
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, [type, item]);

  return (
    <Fragment>
      <View
        style={[
          styles.itemBotSheetHeader,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.accent,
          },
        ]}>
        <View style={[styles.headerText, styles.alignMiddle]}>
          <Text
            style={{ fontSize: 18, fontWeight: '700' }}
            theme={{
              colors: { text: colors.text },
            }}>
            {`${itemInfo?.type?.name} - ${itemInfo?.item?.name}`}
          </Text>
          <Text
            style={{ fontSize: 14, fontWeight: '300' }}
            theme={{
              colors: { text: colors.text },
            }}>
            Add Items
          </Text>
        </View>
        <View style={styles.alignMiddle}>
          <IconButton
            icon="close"
            color={colors.text}
            size={20}
            rippleColor={colors.accent}
            onPress={() => saveFormAndClose()}
          />
        </View>
      </View>
      <BottomSheetScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.itemBotSheetContainer,
          { backgroundColor: colors.background },
        ]}
        persistentScrollbar
        removeClippedSubviews>
        <View style={styles.itemBotSheetContent}>
          {loading ? (
            <View
              style={[
                { flex: 1, flexDirection: 'column' },
                styles.alignMiddle,
              ]}>
              <ActivityIndicator animating={loading} color={colors.text} />
            </View>
          ) : materialSpecList ? (
            materialSpecList.map(material => (
              <View style={styles.materialSpec} key={material.id}>
                <View style={{ flex: 1 }}>
                  <Text>{material.name}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <AddMinusButton
                    count={getCountValue(material)}
                    style={[styles.addMinusBtn, { borderColor: colors.text }]}
                    updateCount={({ count }: { count: number }) => {
                      updateCountValue({ material, count });
                    }}
                  />
                </View>
              </View>
            ))
          ) : null}
        </View>
      </BottomSheetScrollView>
    </Fragment>
  );
};

export default MaterialSpecView;
