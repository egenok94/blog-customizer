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
	const [formState, setFormState] = useState(defaultArticleState);

	const handleClear = () => {
		setFormState(defaultArticleState);
		props.onChange?.(defaultArticleState);
		setIsOpen(false);
	};

	function chageProps() {
		props.onChange?.(formState);
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
		if (isOpen === true) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [asideRef, isOpen]);

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
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(newFont) => {
							setFormState((prevState) => ({
								...prevState,
								fontFamilyOption: newFont,
							}));
						}}
					/>
					<RadioGroup
						name='radio'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(newFontSize) => {
							setFormState((prevState) => ({
								...prevState,
								fontSizeOption: newFontSize,
							}));
						}}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(newFontColor) => {
							setFormState((prevState) => ({
								...prevState,
								fontColor: newFontColor,
							}));
						}}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(newBgColor) => {
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: newBgColor,
							}));
						}}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(newContentWidth) => {
							setFormState((prevState) => ({
								...prevState,
								contentWidth: newContentWidth,
							}));
						}}
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
