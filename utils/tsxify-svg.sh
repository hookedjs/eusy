#!/usr/bin/env bash

# Will create a tsx version of an svg file. Skips if dest exists.
#
# To run in batch, use
# `find src -name "*.svg" -exec ./utils/tsxify-svg.sh {} \;`
# or with dest dir
# # `find src -name "*.svg" -exec ./utils/tsxify-svg.sh {} src/components/icons \;`
#
# Note that $SED syntax is different on OSX, so install linux sed with homebrew first.
# Pull request welcome to convert this to javascript!
#
# Refs
# - PascalCase sed https://unix.stackexchange.com/questions/196239/convert-underscore-to-pascalcase-ie-uppercamelcase
# - Running sed on a sed match https://stackoverflow.com/a/12694634/1202757
#

#set -x #echo on
set -e

if [ "$#" = 0 ]; then
  echo "You must specify a path to an svg file"
  exit
fi

SED=/usr/local/opt/gnu-sed/libexec/gnubin/sed
SRCPATH="$1"
SRCDIR="`dirname $SRCPATH`"
FILENAME="${SRCPATH##*/}"
FILENAME_NO_EXTENSION="${FILENAME%.*}"
PASCAL_REGEX="s/(^|-|_)([a-z])/\U\2/g"

if [ "$#" = 2 ]; then
  DESTDIR="$2"
else
  DESTDIR="$SRCDIR"
fi

# FNCNAME = basename in PascalCase
FILENAME_PASCALCASE=`echo "$FILENAME_NO_EXTENSION" | $SED -r "$PASCAL_REGEX"`
FNCNAME=`echo $FILENAME_PASCALCASE`Icon
DESTPATH="$DESTDIR/$FILENAME_PASCALCASE.icon.tsx"

# Bail if dest exists
if [ -f "$DESTPATH" ]; then
    exit
fi


echo "import React from \"react\";
import Svg,{SvgProps, Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern, Mask} from 'react-native-svg';

export const $FNCNAME = (svgProps: SvgProps) => (" > $DESTPATH
cat $1 >> $DESTPATH
echo ");
" >> $DESTPATH

# Uppercase first letter of XML elements, thereby converting svg elements to react-svg components
# Example: <svg>hello</svg> will be changed to <Svg>hello</Svg>
$SED -i -r "s/(<|<\/)(.)/\1\u\2/g" $DESTPATH

# Change svg attributes to react attributes
# Example: fill-rule= will be changed to fillRule=
$SED -i -r "/ ([^-]*-[^=]*=)/$PASCAL_REGEX" $DESTPATH

# Prettify
$SED -i "s/\/>/\/>\n    /g" $DESTPATH
$SED -i "s/></>\n    </g" $DESTPATH

# Cleanup
$SED -i 's/xmlns="[^"]*"//g' $DESTPATH
$SED -i 's/xmlns:xlink="[^"]*"//g' $DESTPATH
$SED -i 's/xlink:href/href/g' $DESTPATH

# Add props to Svg
$SED -i "s/ >/ {...svgProps} >/" $DESTPATH

# Fix fills to variable
# Turns out this is a bad idea. It's better to do it manually.

#$SED -i 's/fill="[^"]*"/fill={svgProps.fill || "gray"}/g' $DESTPATH

# Now remove unused imports and prettier
# Use a custom tslint.json to ensure that prettier isn't ran before remove unused imports.
npx tslint --fix -p tsconfig.json -c ./utils/tsxify-svg.tslint.json $DESTPATH
npx prettier --write $DESTPATH

echo "Created $DESTPATH."


