// Copyright (c) 2015 Commune CC, Inc. All Rights Reserved.
// See License.txt for license information.

import AudioVideoPreview from './audio_video_preview.jsx';
import CodePreview from './code_preview.jsx';
import PDFPreview from './pdf_preview.jsx';
import FileInfoPreview from './file_info_preview.jsx';
import ViewImagePopoverBar from './view_image_popover_bar.jsx';

import * as GlobalActions from 'actions/global_actions.jsx';

import FileStore from 'stores/file_store.jsx';

import * as Utils from 'utils/utils.jsx';

import Constants from 'utils/constants.jsx';
const KeyCodes = Constants.KeyCodes;

import $ from 'jquery';
import React from 'react';
import {Modal} from 'react-bootstrap';

import loadingGif from 'images/load.gif';

export default class ViewImageModal extends React.Component {
    constructor(props) {
        super(props);

        this.showImage = this.showImage.bind(this);
        this.loadImage = this.loadImage.bind(this);

        this.handleNext = this.handleNext.bind(this);
        this.handlePrev = this.handlePrev.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.onModalShown = this.onModalShown.bind(this);
        this.onModalHidden = this.onModalHidden.bind(this);

        this.handleGetPublicLink = this.handleGetPublicLink.bind(this);
        this.onMouseEnterImage = this.onMouseEnterImage.bind(this);
        this.onMouseLeaveImage = this.onMouseLeaveImage.bind(this);

        this.state = {
            imgId: this.props.startId,
            imgHeight: '100%',
            loaded: Utils.fillArray(false, this.props.fileInfos.length),
            progress: Utils.fillArray(0, this.props.fileInfos.length),
            showFooter: false
        };
    }

    handleNext(e) {
        if (e) {
            e.stopPropagation();
        }
        let id = this.state.imgId + 1;
        if (id > this.props.fileInfos.length - 1) {
            id = 0;
        }
        this.showImage(id);
    }

    handlePrev(e) {
        if (e) {
            e.stopPropagation();
        }
        let id = this.state.imgId - 1;
        if (id < 0) {
            id = this.props.fileInfos.length - 1;
        }
        this.showImage(id);
    }

    handleKeyPress(e) {
        if (e.keyCode === KeyCodes.RIGHT) {
            this.handleNext();
        } else if (e.keyCode === KeyCodes.LEFT) {
            this.handlePrev();
        }
    }

    onModalShown(nextProps) {
        $(window).on('keyup', this.handleKeyPress);

        this.showImage(nextProps.startId);
    }

    onModalHidden() {
        $(window).off('keyup', this.handleKeyPress);

        if (this.refs.video) {
            this.refs.video.stop();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show === true && this.props.show === false) {
            this.onModalShown(nextProps);
        } else if (nextProps.show === false && this.props.show === true) {
            this.onModalHidden();
        }

        if (this.props.fileInfos !== nextProps.fileInfos) {
            this.setState({
                loaded: Utils.fillArray(false, nextProps.fileInfos.length),
                progress: Utils.fillArray(0, nextProps.fileInfos.length)
            });
        }
    }

    showImage(id) {
        this.setState({imgId: id});

        const imgHeight = $(window).height() - 100;
        this.setState({imgHeight});

        if (!this.state.loaded[id]) {
            this.loadImage(id);
        }
    }

    loadImage(index) {
        const fileInfo = this.props.fileInfos[index];
        const fileType = Utils.getFileType(fileInfo.extension);

        if (fileType === 'image') {
            let previewUrl;
            if (fileInfo.has_image_preview) {
                previewUrl = FileStore.getFilePreviewUrl(fileInfo.id);
            } else {
                // some images (eg animated gifs) just show the file itself and not a preview
                previewUrl = FileStore.getFileUrl(fileInfo.id);
            }

            const img = new Image();
            img.load(
                previewUrl,
                () => {
                    const progress = this.state.progress;
                    progress[index] = img.completedPercentage;
                    this.setState({progress});
                }
            );
            img.onload = () => {
                const loaded = this.state.loaded;
                loaded[index] = true;
                this.setState({loaded});
            };
        } else {
            // there's nothing to load for non-image files
            var loaded = this.state.loaded;
            loaded[index] = true;
            this.setState({loaded});
        }
    }

    handleGetPublicLink() {
        this.props.onModalDismissed();

        GlobalActions.showGetPublicLinkModal(this.props.fileInfos[this.state.imgId].id);
    }

    onMouseEnterImage() {
        this.setState({showFooter: true});
    }

    onMouseLeaveImage() {
        this.setState({showFooter: false});
    }

    render() {
        if (this.props.fileInfos.length < 1 || this.props.fileInfos.length - 1 < this.state.imgId) {
            return null;
        }

        const fileInfo = this.props.fileInfos[this.state.imgId];
        const fileUrl = FileStore.getFileUrl(fileInfo.id);

        let content;
        if (this.state.loaded[this.state.imgId]) {
            const fileType = Utils.getFileType(fileInfo.extension);

            if (fileType === 'image') {
                content = (
                    <ImagePreview
                        fileInfo={fileInfo}
                        fileUrl={fileUrl}
                        maxHeight={this.state.imgHeight}
                    />
                );
            } else if (fileType === 'video' || fileType === 'audio') {
                content = (
                    <AudioVideoPreview
                        fileInfo={fileInfo}
                        fileUrl={fileUrl}
                        maxHeight={this.state.imgHeight}
                    />
                );
            } else if (PDFPreview.supports(fileInfo)) {
                content = (
                    <PDFPreview
                        fileInfo={fileInfo}
                        fileUrl={fileUrl}
                    />
                );
            } else if (CodePreview.supports(fileInfo)) {
                content = (
                    <CodePreview
                        fileInfo={fileInfo}
                        fileUrl={fileUrl}
                    />
                );
            } else {
                content = (
                    <FileInfoPreview
                        fileInfo={fileInfo}
                        fileUrl={fileUrl}
                    />
                );
            }
        } else {
            // display a progress indicator when the preview for an image is still loading
            const progress = Math.floor(this.state.progress[this.state.imgId]);

            content = (
                <LoadingImagePreview
                    progress={progress}
                    loading={Utils.localizeMessage('view_image.loading', 'Loading ')}
                />
            );
        }

        let leftArrow = null;
        let rightArrow = null;
        if (this.props.fileInfos.length > 1) {
            leftArrow = (
                <a
                    ref='previewArrowLeft'
                    className='modal-prev-bar'
                    href='#'
                    onClick={this.handlePrev}
                >
                    <i className='image-control image-prev'/>
                </a>
            );

            rightArrow = (
                <a
                    ref='previewArrowRight'
                    className='modal-next-bar'
                    href='#'
                    onClick={this.handleNext}
                >
                    <i className='image-control image-next'/>
                </a>
            );
        }

        let closeButtonClass = 'modal-close';
        if (this.state.showFooter) {
            closeButtonClass += ' modal-close--show';
        }

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onModalDismissed}
                className='modal-image'
                dialogClassName='modal-image'
            >
                <Modal.Body
                    modalClassName='modal-image__body'
                    onClick={this.props.onModalDismissed}
                >
                    <div
                        className={'modal-image__wrapper'}
                        onClick={this.props.onModalDismissed}
                    >
                        <div
                            onMouseEnter={this.onMouseEnterImage}
                            onMouseLeave={this.onMouseLeaveImage}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className={closeButtonClass}
                                onClick={this.props.onModalDismissed}
                            />
                            <div className='modal-image__content'>
                                {content}
                            </div>
                            <ViewImagePopoverBar
                                show={this.state.showFooter}
                                fileId={this.state.imgId}
                                totalFiles={this.props.fileInfos.length}
                                filename={fileInfo.name}
                                fileURL={fileUrl}
                                onGetPublicLink={this.handleGetPublicLink}
                            />
                        </div>
                    </div>
                    {leftArrow}
                    {rightArrow}
                </Modal.Body>
            </Modal>
        );
    }
}

ViewImageModal.defaultProps = {
    show: false,
    fileInfos: [],
    startId: 0
};
ViewImageModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onModalDismissed: React.PropTypes.func.isRequired,
    fileInfos: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    startId: React.PropTypes.number
};

function LoadingImagePreview({progress, loading}) {
    let progressView = null;
    if (progress) {
        progressView = (
            <span className='loader-percent'>
                {loading + progress + '%'}
            </span>
        );
    }

    return (
        <div className='view-image__loading'>
            <img
                className='loader-image'
                src={loadingGif}
            />
            {progressView}
        </div>
    );
}

LoadingImagePreview.propTypes = {
    progress: React.PropTypes.number,
    loading: React.PropTypes.string
};

function ImagePreview({fileInfo, fileUrl, maxHeight}) {
    let previewUrl;
    if (fileInfo.has_preview_image) {
        previewUrl = FileStore.getFilePreviewUrl(fileInfo.id);
    } else {
        previewUrl = fileUrl;
    }

    return (
        <a
            href={fileUrl}
            target='_blank'
            rel='noopener noreferrer'
            download={true}
        >
            <img
                style={{maxHeight}}
                src={previewUrl}
            />
        </a>
    );
}

ImagePreview.propTypes = {
    fileInfo: React.PropTypes.object.isRequired,
    fileUrl: React.PropTypes.string.isRequired,
    maxHeight: React.PropTypes.number.isRequired
};
