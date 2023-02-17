export const getImageUrl = (attachments, type = 'default') => {
  let attachment = '/images/noPreview.png';
  if (attachments && attachments.length > 0) {
    attachment = attachments.find(a => a.image_type === type);
  }
  if (
    attachment &&
    attachment.image &&
    attachment.image.thumb &&
    attachment.image.thumb.url
  ) {
    console.log(attachment.image.thumb.url, 'attachment image 331');
    return attachment.image.thumb.url;
  } else {
    return attachment;
  }
};
