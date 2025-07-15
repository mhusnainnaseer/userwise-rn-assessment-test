import React, { useMemo, useRef, useState } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';

const dummyData = Array.from({ length: 10 }, (_, i) => { return { id: i, title: `Dummy Data ${i}`, url: 'https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg' } })

export const FeedList = () => {

	const flatListRef = useRef(null);
	const [showScrollToTop, setShowScrollToTop] = useState(false);

	function renderItem({ item, index }: { item: { id: number, title: string, url: string }, index: number }) {
		const listItem = useMemo(() => <>
			<Text>{item.title}</Text>
			<Image source={{ uri: require(item.url) }} />
		</>,
			[dummyData, item]);
		return listItem;
	}

	<FlatList
		data={dummyData}
		ref={flatListRef}
		onScroll={() => setShowScrollToTop(true)}
		renderItem={renderItem}
		keyExtractor={({ id }) => id.toString()}
		ListHeaderComponent={(item) => <Text>{item.title}</Text>}
		ListFooterComponent={() => showScrollToTop && <TouchableOpacity onPress={() => {
			flatListRef?.current?.scrollToTop();
			setShowScrollToTop(false)
		}}>
			<Text>{'Move to Top'}</Text>
		</TouchableOpacity>
		}
		stickyHeaderIndices={[0]}
		initialNumToRender={15}
		removeClippedSubviews
		getItemLayout={(item, index) => (
			{ length: 30, offset: 30 * index, index }
		)}
	/>
}