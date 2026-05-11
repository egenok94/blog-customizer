import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import {
	ArticleStateType,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	fontColors,
	fontFamilyOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormType = {
	params: ArticleStateType;
	onChange?: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormType) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement | null>(null);
	const [fontFamily, setFontFamily] = useState(props.params.fontFamilyOption);
	const [fontSize, setFontSize] = useState(props.params.fontSizeOption);
	const [fontColor, setFontColor] = useState(props.params.fontColor);
	const [bgColor, setBgColor] = useState(props.params.backgroundColor);
	const [contentWidth, setContentWidth] = useState(props.params.contentWidth);

	const handleClear = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		props.onChange?.(defaultArticleState);
		setIsOpen(false);
	};

	function chageProps() {
		props.onChange?.({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		chageProps();
		setIsOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current &&
				!asideRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [asideRef, setIsOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={setFontFamily}
					/>
					<RadioGroup
						name='radio'
						selected={fontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={setBgColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
