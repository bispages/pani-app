import React, {
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import { Text, useTheme, Button } from 'react-native-paper';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

import MaterialSpecView from './MaterialSpecView';

import { MaterialType, MaterialItem } from '../../types';
import useBackHandler from '../../hooks/useBackHandler';
import { materialItemsList } from '../../utils/materialItemsList';
import {
  ESTIMATE_MATERIAL_BOTSHEET_SNAPMIN,
  ESTIMATE_MATERIAL_BOTSHEET_SNAPMAX,
} from '../../utils/constants';
import styles from './Estimate.style';

type routeParams = {
  route: { params: { type: MaterialType } };
};

const MaterialItems = ({ route: { params } }: routeParams) => {
  const { type } = params;
  const { dark, colors } = useTheme();
  const navigation = useNavigation();

  const snapPoints = useMemo(
    () => [
      ESTIMATE_MATERIAL_BOTSHEET_SNAPMIN,
      ESTIMATE_MATERIAL_BOTSHEET_SNAPMAX,
    ],
    [],
  );
  const [item, setItem] = useState<MaterialItem>();
  const [isBotSheetActive, setIsBotSheetActive] = useState(false);
  const materialSpecBottomSheet = useRef<BottomSheet>(null);
  const backAction = useCallback(() => {
    if (isBotSheetActive) {
      closeMaterialSpecBotSheet(materialSpecBottomSheet);
      return true;
    }
    return false;
  }, [isBotSheetActive]);

  // Adds hardware BackHandler hook.
  useBackHandler(backAction);

  // Save and Close the bottomSheet
  const saveFormAndClose = () => {
    closeMaterialSpecBotSheet(materialSpecBottomSheet);
  };

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index >= 0) {
        setIsBotSheetActive(true);
      } else {
        setIsBotSheetActive(false);
      }
    },
    [isBotSheetActive],
  );

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={0}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const showMaterialSpecBotSheet = useCallback(
    (item: MaterialItem, sheet: RefObject<BottomSheet>) => {
      setItem(item);
      setTimeout(() => {
        sheet.current?.snapToIndex(1);
      }, 100);
    },
    [],
  );

  const closeMaterialSpecBotSheet = useCallback(
    (sheet: RefObject<BottomSheet>) => sheet.current?.close(),
    [],
  );

  const renderBottomSheet = useCallback(
    (type: MaterialType, item: MaterialItem | undefined) => (
      <BottomSheet
        ref={materialSpecBottomSheet}
        index={-1}
        // enablePanDownToClose
        snapPoints={snapPoints}
        backgroundStyle={{ backgroundColor: colors.background }}
        handleIndicatorStyle={{ backgroundColor: colors.background }}
        handleStyle={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          backgroundColor: dark ? colors.accent : colors.text,
        }}
        onChange={(index: number) => handleSheetChanges(index)}
        backdropComponent={renderBackdrop}>
        <MaterialSpecView
          type={type}
          item={item}
          saveFormAndClose={saveFormAndClose}
        />
      </BottomSheet>
    ),
    [item, type],
  );

  // Function to render material Items List.
  const renderMaterialItemsList = (item: MaterialItem) => (
    <Pressable
      key={item.id}
      onPress={() => showMaterialSpecBotSheet(item, materialSpecBottomSheet)}
      style={[styles.block, { backgroundColor: colors.text }]}
      android_ripple={{ color: colors.background, radius: 200 }}>
      <Text
        style={{ fontSize: 14 }}
        theme={{ colors: { text: colors.background } }}>
        {item.name}
      </Text>
    </Pressable>
  );

  const saveEstimate = () => {
    navigation.navigate('EstimateTableView');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Select Material Items</Text>
      </View>
      <View style={styles.itemsContainer}>
        {materialItemsList ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.listContainer}>
                {materialItemsList.map(renderMaterialItemsList)}
              </View>
            </ScrollView>
          </View>
        ) : null}
      </View>
      <View style={styles.saveBtnContainer}>
        <Button
          dark
          loading={false}
          mode="contained"
          onPress={saveEstimate}
          contentStyle={styles.panelButton}
          theme={{
            colors: {
              primary: colors.accent,
            },
          }}>
          SAVE
        </Button>
      </View>
      {renderBottomSheet(type, item)}
    </View>
  );
};

export default MaterialItems;
