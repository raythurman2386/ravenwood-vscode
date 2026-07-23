/*---------------------------------------------------------------
 *  Homepage:   https://github.com/raythurman2386/ravenwood-vscode
 *  Copyright:  2026 raythurman2386 <support@raythurman.dev>
 *  License:    MIT
 *--------------------------------------------------------------*/

import type { Palette } from '../interface';

/** Return the italic-keyword TextMate rule array. `italicComments` controls comment italicization. */
export function getItalicSyntax(palette: Palette, italicComments: boolean) {
  const syntax = [
    // Syntax{{{
    {
      name: 'Regular',
      scope: 'storage.type.function.arrow, keyword.other.arrow',
      settings: {
        fontStyle: 'regular',
      },
    },
    {
      name: 'Keyword',
      scope:
        'keyword, storage.type.function, storage.type.class, storage.type.enum, storage.type.interface, storage.type.property, keyword.operator.new, keyword.operator.expression, keyword.operator.new, keyword.operator.delete, storage.type.extends',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Keyword Italic',
      scope:
        'keyword.control, storage.type.function, storage.type.class, storage.type.enum, storage.type.interface, storage.type.property, keyword.operator.new, keyword.operator.expression, keyword.operator.new, keyword.operator.delete, storage.type.extends',
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      name: 'Debug',
      scope: 'keyword.other.debugger',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Storage',
      scope:
        'storage, modifier, keyword.var, entity.name.tag, keyword.control.case, keyword.control.switch',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Operator',
      scope: 'keyword.operator',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'String',
      scope:
        'string, punctuation.definition.string.end, punctuation.definition.string.begin, punctuation.definition.string.template.begin, punctuation.definition.string.template.end',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Attribute',
      scope: 'entity.other.attribute-name',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'String Escape',
      scope:
        'constant.character.escape, punctuation.quasi.element, punctuation.definition.template-expression, punctuation.section.embedded, storage.type.format, constant.other.placeholder, constant.other.placeholder, variable.interpolation',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Function',
      scope:
        'entity.name.function, support.function, meta.function, meta.function-call, meta.definition.method',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Preproc',
      scope:
        'keyword.control.at-rule, keyword.control.import, keyword.control.export, storage.type.namespace, punctuation.decorator, keyword.control.directive, keyword.preprocessor, punctuation.definition.preprocessor, punctuation.definition.directive, keyword.other.import, keyword.other.package, entity.name.type.namespace, entity.name.scope-resolution, keyword.other.using, keyword.package, keyword.import, keyword.map',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Preproc Italic',
      scope:
        'keyword.control.at-rule, keyword.control.import, keyword.control.export, storage.type.namespace, keyword.control.directive, keyword.preprocessor, keyword.other.import, keyword.other.package, entity.name.type.namespace, entity.name.scope-resolution, keyword.other.using, keyword.package, keyword.import, keyword.map',
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      name: 'Annotation',
      scope: 'storage.type.annotation',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Label',
      scope: 'entity.name.label, constant.other.label',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Modules',
      scope:
        'support.module, support.node, support.other.module, support.type.object.module, entity.name.type.module, entity.name.type.class.module, keyword.control.module',
      settings: {
        foreground: palette.aqua,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Type',
      scope: 'storage.type, support.type, entity.name.type, keyword.type',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Class',
      scope:
        'entity.name.type.class, support.class, entity.name.class, entity.other.inherited-class, storage.class',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Number',
      scope: 'constant.numeric',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'Boolean',
      scope: 'constant.language.boolean',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'Macro',
      scope: 'entity.name.function.preprocessor',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'Special identifier',
      scope:
        'variable.language.this, variable.language.self, variable.language.super, keyword.other.this, variable.language.special, constant.language.null, constant.language.undefined, constant.language.nan',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Constant',
      scope: 'constant.language, support.constant',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'Identifier',
      scope: 'variable, support.variable, meta.definition.variable',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Property',
      scope:
        'variable.object.property, support.variable.property, variable.other.property, variable.other.object.property, variable.other.enummember, variable.other.member, meta.object-literal.key',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Delimiter',
      scope: 'punctuation, meta.brace, meta.delimiter, meta.bracket',
      settings: {
        foreground: palette.fg,
      },
    },
    // }}}
    // Markdown{{{
    {
      name: 'Markdown heading1',
      scope: 'heading.1.markdown, markup.heading.setext.1.markdown',
      settings: {
        foreground: palette.red,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading2',
      scope: 'heading.2.markdown, markup.heading.setext.2.markdown',
      settings: {
        foreground: palette.orange,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading3',
      scope: 'heading.3.markdown',
      settings: {
        foreground: palette.yellow,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading4',
      scope: 'heading.4.markdown',
      settings: {
        foreground: palette.green,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading5',
      scope: 'heading.5.markdown',
      settings: {
        foreground: palette.blue,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading6',
      scope: 'heading.6.markdown',
      settings: {
        foreground: palette.purple,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown heading delimiter',
      scope: 'punctuation.definition.heading.markdown',
      settings: {
        foreground: palette.grey1,
        fontStyle: 'regular',
      },
    },
    {
      name: 'Markdown link',
      scope:
        'string.other.link.title.markdown, constant.other.reference.link.markdown, string.other.link.description.markdown',
      settings: {
        foreground: palette.purple,
        fontStyle: 'regular',
      },
    },
    {
      name: 'Markdown link text',
      scope:
        'markup.underline.link.image.markdown, markup.underline.link.markdown',
      settings: {
        foreground: palette.green,
        fontStyle: 'underline',
      },
    },
    {
      name: 'Markdown delimiter',
      scope:
        'punctuation.definition.string.begin.markdown, punctuation.definition.string.end.markdown, punctuation.definition.italic.markdown, punctuation.definition.quote.begin.markdown, punctuation.definition.metadata.markdown, punctuation.separator.key-value.markdown, punctuation.definition.constant.markdown',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Markdown bold delimiter',
      scope: 'punctuation.definition.bold.markdown',
      settings: {
        foreground: palette.grey1,
        fontStyle: 'regular',
      },
    },
    {
      name: 'Markdown separator delimiter',
      scope:
        'meta.separator.markdown, punctuation.definition.constant.begin.markdown, punctuation.definition.constant.end.markdown',
      settings: {
        foreground: palette.grey1,
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown italic',
      scope: 'markup.italic',
      settings: {
        fontStyle: 'italic',
      },
    },
    {
      name: 'Markdown bold',
      scope: 'markup.bold',
      settings: {
        fontStyle: 'bold',
      },
    },
    {
      name: 'Markdown bold italic',
      scope: 'markup.bold markup.italic, markup.italic markup.bold',
      settings: {
        fontStyle: 'italic bold',
      },
    },
    {
      name: 'Markdown code delimiter',
      scope:
        'punctuation.definition.markdown, punctuation.definition.raw.markdown',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Markdown code type',
      scope: 'fenced_code.block.language',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Markdown code block',
      scope:
        'markup.fenced_code.block.markdown, markup.inline.raw.string.markdown',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Markdown list mark',
      scope: 'punctuation.definition.list.begin.markdown',
      settings: {
        foreground: palette.red,
      },
    },
    // }}}
    // reStructuredText{{{
    {
      name: 'reStructuredText heading',
      scope: 'punctuation.definition.heading.restructuredtext',
      settings: {
        foreground: palette.orange,
        fontStyle: 'bold',
      },
    },
    {
      name: 'reStructuredText delimiter',
      scope:
        'punctuation.definition.field.restructuredtext, punctuation.separator.key-value.restructuredtext, punctuation.definition.directive.restructuredtext, punctuation.definition.constant.restructuredtext, punctuation.definition.italic.restructuredtext, punctuation.definition.table.restructuredtext',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'reStructuredText delimiter bold',
      scope: 'punctuation.definition.bold.restructuredtext',
      settings: {
        foreground: palette.grey1,
        fontStyle: 'regular',
      },
    },
    {
      name: 'reStructuredText aqua',
      scope:
        'entity.name.tag.restructuredtext, punctuation.definition.link.restructuredtext, punctuation.definition.raw.restructuredtext, punctuation.section.raw.restructuredtext',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'reStructuredText purple',
      scope: 'constant.other.footnote.link.restructuredtext',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'reStructuredText red',
      scope: 'support.directive.restructuredtext',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'reStructuredText green',
      scope:
        'entity.name.directive.restructuredtext, markup.raw.restructuredtext, markup.raw.inner.restructuredtext, string.other.link.title.restructuredtext',
      settings: {
        foreground: palette.green,
      },
    },
    // }}}
    // LaTex{{{
    {
      name: 'LaTex delimiter',
      scope:
        'punctuation.definition.function.latex, punctuation.definition.function.tex, punctuation.definition.keyword.latex, constant.character.newline.tex, punctuation.definition.keyword.tex',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'LaTex red',
      scope: 'support.function.be.latex',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'LaTex orange',
      scope:
        'support.function.section.latex, keyword.control.table.cell.latex, keyword.control.table.newline.latex',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'LaTex yellow',
      scope:
        'support.class.latex, variable.parameter.latex, variable.parameter.function.latex, variable.parameter.definition.label.latex, constant.other.reference.label.latex',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'LaTex purple',
      scope: 'keyword.control.preamble.latex',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Html/Xml{{{
    {
      name: 'Html grey',
      scope: 'punctuation.separator.namespace.xml',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Html orange',
      scope:
        'entity.name.tag.html, entity.name.tag.xml, entity.name.tag.localname.xml',
      settings: {
        foreground: palette.orange,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Html yellow',
      scope:
        'entity.other.attribute-name.html, entity.other.attribute-name.xml, entity.other.attribute-name.localname.xml',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Html green',
      scope:
        'string.quoted.double.html, string.quoted.single.html, punctuation.definition.string.begin.html, punctuation.definition.string.end.html, punctuation.separator.key-value.html, punctuation.definition.string.begin.xml, punctuation.definition.string.end.xml, string.quoted.double.xml, string.quoted.single.xml, punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.definition.tag.xml, meta.tag.xml, meta.tag.preprocessor.xml, meta.tag.other.html, meta.tag.block.any.html, meta.tag.inline.any.html',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Html purple',
      scope: 'variable.language.documentroot.xml, meta.tag.sgml.doctype.xml',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Proto{{{
    {
      name: 'Proto yellow',
      scope: 'storage.type.proto',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Proto green',
      scope:
        'string.quoted.double.proto.syntax, string.quoted.single.proto.syntax, string.quoted.double.proto, string.quoted.single.proto',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Proto aqua',
      scope: 'entity.name.class.proto, entity.name.class.message.proto',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // CSS{{{
    {
      name: 'CSS grey',
      scope:
        'punctuation.definition.entity.css, punctuation.separator.key-value.css, punctuation.terminator.rule.css, punctuation.separator.list.comma.css',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'CSS red',
      scope: 'entity.other.attribute-name.class.css',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'CSS orange',
      scope: 'keyword.other.unit',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'CSS yellow',
      scope:
        'entity.other.attribute-name.pseudo-class.css, entity.other.attribute-name.pseudo-element.css',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'CSS green',
      scope:
        'string.quoted.single.css, string.quoted.double.css, support.constant.property-value.css, meta.property-value.css, punctuation.definition.string.begin.css, punctuation.definition.string.end.css, constant.numeric.css, support.constant.font-name.css, variable.parameter.keyframe-list.css',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'CSS aqua',
      scope: 'support.type.property-name.css',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'CSS blue',
      scope: 'support.type.vendored.property-name.css',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'CSS purple',
      scope:
        'entity.name.tag.css, entity.other.keyframe-offset.css, punctuation.definition.keyword.css, keyword.control.at-rule.keyframes.css, meta.selector.css',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // SASS{{{
    {
      name: 'SASS grey',
      scope:
        'punctuation.definition.entity.scss, punctuation.separator.key-value.scss, punctuation.terminator.rule.scss, punctuation.separator.list.comma.scss',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'SASS orange',
      scope: 'keyword.control.at-rule.keyframes.scss',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'SASS yellow',
      scope:
        'punctuation.definition.interpolation.begin.bracket.curly.scss, punctuation.definition.interpolation.end.bracket.curly.scss',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'SASS green',
      scope:
        'punctuation.definition.string.begin.scss, punctuation.definition.string.end.scss, string.quoted.double.scss, string.quoted.single.scss, constant.character.css.sass, meta.property-value.scss',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'SASS red',
      scope:
        'keyword.control.at-rule.if.scss, keyword.control.at-rule.else.scss, keyword.control.at-rule.for.scss, keyword.control.at-rule.each.scss, keyword.control.at-rule.while.scss, keyword.control.at-rule.return.scss, keyword.control.at-rule.warn.scss, keyword.control.at-rule.error.scss, keyword.control.at-rule.debug.scss',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'SASS aqua',
      scope:
        'keyword.control.at-rule.function.scss, keyword.control.at-rule.at-root.scss, keyword.control.at-rule.content.scss',
      settings: {
        foreground: palette.aqua,
        fontStyle: 'italic',
      },
    },
    {
      name: 'SASS blue',
      scope: 'variable.other.readwrite.scss',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'SASS purple',
      scope:
        'keyword.control.at-rule.include.scss, keyword.control.at-rule.use.scss, keyword.control.at-rule.mixin.scss, keyword.control.at-rule.extend.scss, keyword.control.at-rule.import.scss',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Stylus{{{
    {
      name: 'Stylus white',
      scope: 'meta.function.stylus',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Stylus yellow',
      scope: 'entity.name.function.stylus',
      settings: {
        foreground: palette.yellow,
      },
    },
    // }}}
    // JavaScript{{{
    {
      name: 'JavaScript white',
      scope: 'string.unquoted.js',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'JavaScript grey',
      scope:
        'punctuation.accessor.js, punctuation.separator.key-value.js, punctuation.separator.label.js, keyword.operator.accessor.js',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'JavaScript red',
      scope: 'punctuation.definition.block.tag.jsdoc',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'JavaScript orange',
      scope: 'storage.type.js, storage.type.function.arrow.js',
      settings: {
        foreground: palette.orange,
      },
    },
    // }}}
    // JSX{{{
    {
      name: 'JSX white',
      scope: 'JSXNested',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'JSX green',
      scope:
        'punctuation.definition.tag.jsx, entity.other.attribute-name.jsx, punctuation.definition.tag.begin.js.jsx, punctuation.definition.tag.end.js.jsx, entity.other.attribute-name.js.jsx',
      settings: {
        foreground: palette.green,
      },
    },
    // }}}
    // TypeScript{{{
    {
      name: 'TypeScript white',
      scope: 'entity.name.type.module.ts',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'TypeScript grey',
      scope:
        'keyword.operator.type.annotation.ts, punctuation.accessor.ts, punctuation.separator.key-value.ts',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'TypeScript green',
      scope:
        'punctuation.definition.tag.directive.ts, entity.other.attribute-name.directive.ts',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'TypeScript aqua',
      scope:
        'entity.name.type.ts, entity.name.type.interface.ts, entity.other.inherited-class.ts, entity.name.type.alias.ts, entity.name.type.class.ts, entity.name.type.enum.ts',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'TypeScript orange',
      scope:
        'storage.type.ts, storage.type.function.arrow.ts, storage.type.type.ts',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'TypeScript purple',
      scope:
        'keyword.control.import.ts, keyword.control.export.ts, storage.type.namespace.ts',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // TSX{{{
    {
      name: 'TSX grey',
      scope:
        'keyword.operator.type.annotation.tsx, punctuation.accessor.tsx, punctuation.separator.key-value.tsx',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'TSX green',
      scope:
        'punctuation.definition.tag.directive.tsx, entity.other.attribute-name.directive.tsx, punctuation.definition.tag.begin.tsx, punctuation.definition.tag.end.tsx, entity.other.attribute-name.tsx',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'TSX aqua',
      scope:
        'entity.name.type.tsx, entity.name.type.interface.tsx, entity.other.inherited-class.tsx, entity.name.type.alias.tsx, entity.name.type.class.tsx, entity.name.type.enum.tsx',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'TSX blue',
      scope: 'entity.name.type.module.tsx',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'TSX purple',
      scope:
        'keyword.control.import.tsx, keyword.control.export.tsx, storage.type.namespace.tsx',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    {
      name: 'TSX orange',
      scope:
        'storage.type.tsx, storage.type.function.arrow.tsx, storage.type.type.tsx, support.class.component.tsx',
      settings: {
        foreground: palette.orange,
      },
    },
    // }}}
    // CoffeeScript{{{
    {
      name: 'CoffeeScript grey',
      scope:
        'punctuation.separator.key-value.coffee, punctuation.terminator.statement.coffee',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'CoffeeScript orange',
      scope:
        'storage.type.function.coffee, keyword.operator.new.coffee, storage.modifier.coffee',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'CoffeeScript red',
      scope:
        'keyword.control.class.coffee, keyword.control.conditional.coffee, keyword.control.loop.coffee',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'CoffeeScript green',
      scope:
        'string.quoted.single.coffee, string.quoted.double.coffee, punctuation.definition.string.begin.coffee, punctuation.definition.string.end.coffee, string.interpolated.coffee',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'CoffeeScript aqua',
      scope: 'entity.name.class.coffee, variable.other.readwrite.class.coffee',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'CoffeeScript purple',
      scope: 'constant.language.boolean.coffee, constant.language.null.coffee',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // PureScript{{{
    {
      name: 'PureScript white',
      scope: 'meta.type-signature.purescript',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'PureScript orange',
      scope:
        'keyword.other.double-colon.purescript, keyword.other.arrow.purescript, keyword.other.big-arrow.purescript',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'PureScript yellow',
      scope: 'entity.name.function.purescript',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'PureScript green',
      scope:
        'string.quoted.single.purescript, string.quoted.double.purescript, punctuation.definition.string.begin.purescript, punctuation.definition.string.end.purescript, string.quoted.triple.purescript, entity.name.type.purescript',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'PureScript purple',
      scope: 'support.other.module.purescript',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Dart{{{
    {
      name: 'Dart grey',
      scope: 'punctuation.dot.dart',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Dart orange',
      scope: 'storage.type.primitive.dart',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Dart yellow',
      scope: 'support.class.dart',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Dart green',
      scope:
        'entity.name.function.dart, string.interpolated.single.dart, string.interpolated.double.dart',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Dart blue',
      scope: 'variable.language.dart',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Dart purple',
      scope: 'keyword.other.import.dart, storage.type.annotation.dart',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Pug{{{
    {
      name: 'Pug red',
      scope: 'entity.other.attribute-name.class.pug',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Pug orange',
      scope: 'storage.type.function.pug',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Pug aqua',
      scope: 'entity.other.attribute-name.tag.pug',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Pug purple',
      scope: 'entity.name.tag.pug, storage.type.import.include.pug',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // C{{{
    {
      name: 'C white',
      scope:
        'meta.function-call.c, storage.modifier.array.bracket.square.c, meta.function.definition.parameters.c',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'C grey',
      scope:
        'punctuation.separator.dot-access.c, constant.character.escape.line-continuation.c',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'C red',
      scope:
        'keyword.control.directive.include.c, punctuation.definition.directive.c, keyword.control.directive.pragma.c, keyword.control.directive.line.c, keyword.control.directive.define.c, keyword.control.directive.conditional.c, keyword.control.directive.diagnostic.error.c, keyword.control.directive.undef.c, keyword.control.directive.conditional.ifdef.c, keyword.control.directive.endif.c, keyword.control.directive.conditional.ifndef.c, keyword.control.directive.conditional.if.c, keyword.control.directive.else.c',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'C orange',
      scope: 'punctuation.separator.pointer-access.c',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'C aqua',
      scope: 'variable.other.member.c',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // C++{{{
    {
      name: 'C++ white',
      scope:
        'meta.function-call.cpp, storage.modifier.array.bracket.square.cpp, meta.function.definition.parameters.cpp, meta.body.function.definition.cpp',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'C++ grey',
      scope:
        'punctuation.separator.dot-access.cpp, constant.character.escape.line-continuation.cpp',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'C++ red',
      scope:
        'keyword.control.directive.include.cpp, punctuation.definition.directive.cpp, keyword.control.directive.pragma.cpp, keyword.control.directive.line.cpp, keyword.control.directive.define.cpp, keyword.control.directive.conditional.cpp, keyword.control.directive.diagnostic.error.cpp, keyword.control.directive.undef.cpp, keyword.control.directive.conditional.ifdef.cpp, keyword.control.directive.endif.cpp, keyword.control.directive.conditional.ifndef.cpp, keyword.control.directive.conditional.if.cpp, keyword.control.directive.else.cpp, storage.type.namespace.definition.cpp, keyword.other.using.directive.cpp, storage.type.struct.cpp',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'C++ orange',
      scope:
        'punctuation.separator.pointer-access.cpp, punctuation.section.angle-brackets.begin.template.call.cpp, punctuation.section.angle-brackets.end.template.call.cpp',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'C++ aqua',
      scope: 'variable.other.member.cpp',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'C++ blue',
      scope:
        'storage.type.modifier.access.control.public.cpp, storage.type.modifier.access.control.private.cpp',
      settings: {
        foreground: palette.blue,
      },
    },
    // }}}
    // C#{{{
    {
      name: 'C# red',
      scope: 'keyword.other.using.cs',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'C# yellow',
      scope:
        'keyword.type.cs, constant.character.escape.cs, punctuation.definition.interpolation.begin.cs, punctuation.definition.interpolation.end.cs',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'C# green',
      scope:
        'string.quoted.double.cs, string.quoted.single.cs, punctuation.definition.string.begin.cs, punctuation.definition.string.end.cs',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'C# aqua',
      scope: 'variable.other.object.property.cs',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'C# purple',
      scope: 'entity.name.type.namespace.cs',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // F#{{{
    {
      name: 'F# white',
      scope: 'keyword.symbol.fsharp, constant.language.unit.fsharp',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'F# yellow',
      scope: 'keyword.format.specifier.fsharp, entity.name.type.fsharp',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'F# green',
      scope:
        'string.quoted.double.fsharp, string.quoted.single.fsharp, punctuation.definition.string.begin.fsharp, punctuation.definition.string.end.fsharp',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'F# blue',
      scope: 'entity.name.section.fsharp',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'F# purple',
      scope: 'support.function.attribute.fsharp',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Java{{{
    {
      name: 'Java grey',
      scope: 'punctuation.separator.java, punctuation.separator.period.java',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Java red',
      scope: 'keyword.other.import.java, keyword.other.package.java',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Java orange',
      scope: 'storage.type.function.arrow.java, keyword.control.ternary.java',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Java aqua',
      scope: 'variable.other.property.java',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Java purple',
      scope:
        'variable.language.wildcard.java, storage.modifier.import.java, storage.type.annotation.java, punctuation.definition.annotation.java, storage.modifier.package.java, entity.name.type.module.java',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Kotlin{{{
    {
      name: 'Kotlin red',
      scope: 'keyword.other.import.kotlin',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Kotlin orange',
      scope: 'storage.type.kotlin',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Kotlin aqua',
      scope: 'constant.language.kotlin',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Kotlin purple',
      scope: 'entity.name.package.kotlin, storage.type.annotation.kotlin',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Scala{{{
    {
      name: 'Scala purple',
      scope: 'entity.name.package.scala',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Scala blue',
      scope: 'constant.language.scala',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Scala aqua',
      scope: 'entity.name.import.scala',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Scala green',
      scope:
        'string.quoted.double.scala, string.quoted.single.scala, punctuation.definition.string.begin.scala, punctuation.definition.string.end.scala, string.quoted.double.interpolated.scala, string.quoted.single.interpolated.scala, string.quoted.triple.scala',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Scala yellow',
      scope: 'entity.name.class.scala, entity.other.inherited-class.scala',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Scala orange',
      scope: 'keyword.declaration.stable.scala, keyword.other.arrow.scala',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Scala red',
      scope: 'keyword.other.import.scala',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Groovy{{{
    {
      name: 'Groovy white',
      scope:
        'keyword.operator.navigation.groovy, meta.method.body.java, meta.definition.method.groovy, meta.definition.method.signature.java',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Groovy grey',
      scope: 'punctuation.separator.groovy',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Groovy red',
      scope:
        'keyword.other.import.groovy, keyword.other.package.groovy, keyword.other.import.static.groovy',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Groovy orange',
      scope: 'storage.type.def.groovy',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Groovy green',
      scope: 'variable.other.interpolated.groovy, meta.method.groovy',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Groovy aqua',
      scope: 'storage.modifier.import.groovy, storage.modifier.package.groovy',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Groovy purple',
      scope: 'storage.type.annotation.groovy',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Go{{{
    {
      name: 'Go red',
      scope: 'keyword.control.go, keyword.type.go',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Go orange',
      scope:
        'keyword.var.go, keyword.const.go, keyword.func.go, keyword.struct.go, keyword.interface.go, keyword.map.go, keyword.chan.go, keyword.declaration.go',
      settings: {
        foreground: palette.orange,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Go yellow',
      scope:
        'entity.name.type.go, entity.name.type.parameter.go, entity.name.type.generic.go',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Go green',
      scope: 'entity.name.function.go, support.function.go',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Go aqua',
      scope: 'entity.name.package.go, entity.name.import.go',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Go purple',
      scope:
        'constant.language.go, constant.other.placeholder.go, keyword.import.go, keyword.package.go',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Rust{{{
    {
      name: 'Rust white',
      scope: 'entity.name.type.mod.rust',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Rust grey',
      scope: 'keyword.operator.path.rust, keyword.operator.member-access.rust',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Rust red',
      scope: 'keyword.control.rust, keyword.other.rust',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Rust orange',
      scope: 'storage.type.rust, storage.modifier.rust, keyword.operator.rust',
      settings: {
        foreground: palette.orange,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Rust yellow',
      scope:
        'entity.name.type.struct.rust, entity.name.type.enum.rust, entity.name.type.trait.rust, entity.name.type.rust',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Rust green',
      scope:
        'entity.name.function.rust, support.function.rust, meta.function.rust',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Rust aqua',
      scope:
        'support.constant.core.rust, entity.name.type.lifetime.rust, entity.name.function.macro.rust, meta.macro.rust, entity.name.type.self.rust',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Rust blue',
      scope: 'variable.other.rust, variable.parameter.rust',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Rust purple',
      scope:
        'meta.attribute.rust, variable.language.rust, storage.type.module.rust, entity.name.constant.rust, constant.other.rust, storage.modifier.lifetime.rust, entity.name.type.parameter.rust',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Swift{{{
    {
      name: 'Swift white',
      scope: 'meta.function-call.swift, support.function.any-method.swift',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Swift red',
      scope: 'keyword.control.swift, keyword.control.flow.swift',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Swift orange',
      scope:
        'storage.type.swift, storage.modifier.swift, keyword.operator.swift',
      settings: {
        foreground: palette.orange,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Swift yellow',
      scope: 'entity.name.type.swift, support.type.swift',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Swift green',
      scope: 'entity.name.function.swift, support.function.swift',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Swift aqua',
      scope: 'support.variable.swift, entity.name.type.attribute.swift',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Swift purple',
      scope:
        'entity.name.class.swift, support.class.swift, constant.language.swift',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // PHP{{{
    {
      name: 'PHP white',
      scope: 'keyword.operator.class.php',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'PHP orange',
      scope: 'storage.type.trait.php',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'PHP aqua',
      scope: 'constant.language.php, support.other.namespace.php',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'PHP purple',
      scope: 'keyword.control.import.include.php, storage.type.php',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Python{{{
    {
      name: 'Python white',
      scope: 'meta.function-call.arguments.python',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Python grey',
      scope:
        'punctuation.definition.decorator.python, punctuation.separator.period.python',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Python red',
      scope:
        'keyword.control.flow.python, keyword.control.conditional.python, keyword.control.loop.python',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Python orange',
      scope: 'storage.type.function.python, keyword.operator.python',
      settings: {
        foreground: palette.orange,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Python yellow',
      scope:
        'entity.name.type.python, support.type.python, entity.name.function.decorator.python, meta.function.decorator.python',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Python green',
      scope:
        'entity.name.function.python, support.function.builtin.python, entity.name.function.magic.python, support.function.magic.python, string.interpolated.python, constant.character.format.placeholder.python, meta.string-formatter.python',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Python aqua',
      scope: 'constant.language.python',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Python purple',
      scope:
        'keyword.control.import.python, keyword.control.import.from.python',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Lua{{{
    {
      name: 'Lua grey',
      scope:
        'punctuation.separator.field.lua, punctuation.parameters.definition.lua, punctuation.separator.arguments.lua',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Lua red',
      scope:
        'keyword.control.lua, keyword.control.conditional.lua, keyword.control.loop.lua, keyword.control.return.lua',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Lua orange',
      scope: 'storage.type.lua, keyword.operator.lua',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Lua green',
      scope:
        'string.quoted.single.lua, string.quoted.double.lua, punctuation.definition.string.begin.lua, punctuation.definition.string.end.lua, support.function.lua',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Lua aqua',
      scope: 'constant.language.lua',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Lua blue',
      scope: 'entity.name.class.lua, entity.name.function.lua',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Lua purple',
      scope: 'constant.numeric.lua, variable.language.self.lua',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Ruby{{{
    {
      name: 'Ruby white',
      scope: 'meta.function.method.with-arguments.ruby',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Ruby grey',
      scope: 'punctuation.separator.method.ruby',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Ruby orange',
      scope: 'keyword.control.pseudo-method.ruby, storage.type.variable.ruby',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Ruby green',
      scope: 'keyword.other.special-method.ruby',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Ruby purple italic',
      scope: 'keyword.control.module.ruby',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Ruby purple regular',
      scope: 'punctuation.definition.constant.ruby',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'Ruby yellow',
      scope:
        'string.regexp.character-class.ruby,string.regexp.interpolated.ruby,punctuation.definition.character-class.ruby,string.regexp.group.ruby, punctuation.section.regexp.ruby, punctuation.definition.group.ruby',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Ruby blue',
      scope: 'variable.other.constant.ruby',
      settings: {
        foreground: palette.blue,
      },
    },
    // }}}
    // Haskell{{{
    {
      name: 'Haskell orange',
      scope:
        'keyword.other.arrow.haskell, keyword.other.big-arrow.haskell, keyword.other.double-colon.haskell',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Haskell yellow',
      scope: 'storage.type.haskell',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Haskell green',
      scope:
        'constant.other.haskell, string.quoted.double.haskell, string.quoted.single.haskell, punctuation.definition.string.begin.haskell, punctuation.definition.string.end.haskell',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Haskell blue',
      scope: 'entity.name.function.haskell',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Haskell aqua',
      scope: 'entity.name.namespace, meta.preprocessor.haskell',
      settings: {
        foreground: palette.aqua,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Julia{{{
    {
      name: 'Julia grey',
      scope:
        'punctuation.separator.inheritance.julia, punctuation.definition.type-parameter.julia',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Julia red',
      scope:
        'keyword.control.import.julia, keyword.control.export.julia, keyword.control.module.julia, keyword.control.using.julia, keyword.control.if.julia, keyword.control.else.julia, keyword.control.elseif.julia, keyword.control.for.julia, keyword.control.while.julia, keyword.control.return.julia',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Julia orange',
      scope:
        'keyword.storage.modifier.julia, storage.type.julia, keyword.operator.julia',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Julia yellow',
      scope: 'entity.name.type.julia, support.type.julia',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Julia green',
      scope:
        'string.quoted.single.julia, string.quoted.double.julia, punctuation.definition.string.begin.julia, punctuation.definition.string.end.julia, entity.name.function.julia, support.function.julia',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Julia aqua',
      scope: 'constant.language.julia',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Julia purple',
      scope:
        'support.function.macro.julia, constant.numeric.julia, variable.language.julia',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Elm{{{
    {
      name: 'Elm white',
      scope: 'keyword.other.period.elm',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Elm grey',
      scope: 'punctuation.separator.pipe.elm, punctuation.definition.list.elm',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Elm red',
      scope:
        'keyword.control.module.elm, keyword.control.import.elm, keyword.control.exposing.elm, keyword.control.if.elm, keyword.control.then.elm, keyword.control.else.elm, keyword.control.case.elm, keyword.control.let.elm, keyword.control.in.elm',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Elm orange',
      scope:
        'keyword.operator.arrow.elm, keyword.operator.big-arrow.elm, keyword.operator.pipe.elm',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Elm yellow',
      scope: 'storage.type.elm, entity.name.type.elm, support.type.elm',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Elm green',
      scope:
        'string.quoted.single.elm, string.quoted.double.elm, punctuation.definition.string.begin.elm, punctuation.definition.string.end.elm',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Elm aqua',
      scope: 'entity.name.function.elm, support.function.elm',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Elm purple',
      scope:
        'constant.language.elm, constant.other.elm, entity.name.type.constructor.elm',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // R{{{
    {
      name: 'R orange',
      scope: 'keyword.other.r',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'R green',
      scope: 'entity.name.function.r, variable.function.r',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'R aqua',
      scope: 'constant.language.r',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'R purple',
      scope: 'entity.namespace.r',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Erlang{{{
    {
      name: 'Erlang grey',
      scope:
        'punctuation.separator.module-function.erlang, punctuation.section.directive.begin.erlang',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Erlang red',
      scope:
        'keyword.control.directive.erlang, keyword.control.directive.define.erlang',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Erlang yellow',
      scope: 'entity.name.type.class.module.erlang',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Erlang green',
      scope:
        'string.quoted.double.erlang, string.quoted.single.erlang, punctuation.definition.string.begin.erlang, punctuation.definition.string.end.erlang',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Erlang purple',
      scope:
        'keyword.control.directive.export.erlang, keyword.control.directive.module.erlang, keyword.control.directive.import.erlang, keyword.control.directive.behaviour.erlang',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // Elixir{{{
    {
      name: 'Elixir aqua',
      scope:
        'variable.other.readwrite.module.elixir, punctuation.definition.variable.elixir',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Elixir blue',
      scope: 'constant.language.elixir',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Elixir purple',
      scope: 'keyword.control.module.elixir',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    // }}}
    // OCaml{{{
    {
      name: 'OCaml white',
      scope: 'entity.name.type.value-signature.ocaml',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'OCaml grey',
      scope:
        'punctuation.separator.pipe.ocaml, punctuation.definition.list.ocaml, punctuation.separator.semicolon.ocaml',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'OCaml red',
      scope:
        'keyword.control.module.ocaml, keyword.control.sig.ocaml, keyword.control.struct.ocaml, keyword.control.open.ocaml, keyword.control.match.ocaml, keyword.control.with.ocaml, keyword.control.try.ocaml',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'OCaml orange',
      scope:
        'keyword.other.ocaml, keyword.operator.ocaml, keyword.other.arrow.ocaml',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'OCaml yellow',
      scope: 'storage.type.ocaml, entity.name.type.ocaml, support.type.ocaml',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'OCaml green',
      scope:
        'string.quoted.double.ocaml, punctuation.definition.string.begin.ocaml, punctuation.definition.string.end.ocaml',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'OCaml aqua',
      scope: 'constant.language.variant.ocaml, entity.name.function.ocaml',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'OCaml purple',
      scope: 'constant.numeric.ocaml, entity.name.module.ocaml',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Perl{{{
    {
      name: 'Perl grey',
      scope:
        'punctuation.separator.array.perl, punctuation.separator.hash.perl, punctuation.section.block.perl',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Perl red',
      scope:
        'storage.type.sub.perl, storage.type.declare.routine.perl, keyword.control.package.perl, keyword.control.use.perl',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Perl orange',
      scope:
        'keyword.operator.assignement.perl, keyword.operator.string.perl, storage.modifier.perl',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Perl green',
      scope:
        'string.quoted.single.perl, string.quoted.double.perl, punctuation.definition.string.begin.perl, punctuation.definition.string.end.perl, string.regexp.perl, string.regexp.modifier.perl',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Perl aqua',
      scope: 'entity.name.function.perl, variable.other.subroutine.perl',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Perl purple',
      scope:
        'constant.language.perl, variable.language.perl, variable.other.predefined.perl, keyword.control.constant.perl',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Common Lisp{{{
    {
      name: 'Lisp white',
      scope: 'meta.function.lisp',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Lisp red',
      scope: 'storage.type.function-type.lisp',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Lisp green',
      scope: 'keyword.constant.lisp',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Lisp aqua',
      scope: 'entity.name.function.lisp',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // Clojure{{{
    {
      name: 'Clojure green',
      scope:
        'constant.keyword.clojure, support.variable.clojure, meta.definition.variable.clojure',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Clojure purple',
      scope: 'entity.global.clojure',
      settings: {
        foreground: palette.purple,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Clojure blue',
      scope: 'entity.name.function.clojure',
      settings: {
        foreground: palette.blue,
      },
    },
    // }}}
    // Shell{{{
    {
      name: 'Shell white',
      scope: 'meta.scope.if-block.shell, meta.scope.group.shell',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'Shell yellow',
      scope: 'support.function.builtin.shell, entity.name.function.shell',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Shell green',
      scope:
        'string.quoted.double.shell, string.quoted.single.shell, punctuation.definition.string.begin.shell, punctuation.definition.string.end.shell, string.unquoted.heredoc.shell',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Shell purple',
      scope:
        'keyword.control.heredoc-token.shell, variable.other.normal.shell, punctuation.definition.variable.shell, variable.other.special.shell, variable.other.positional.shell, variable.other.bracket.shell',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Fish{{{
    {
      name: 'Fish red',
      scope: 'support.function.builtin.fish',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Fish orange',
      scope: 'support.function.unix.fish',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Fish blue',
      scope:
        'variable.other.normal.fish, punctuation.definition.variable.fish, variable.other.fixed.fish, variable.other.special.fish',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Fish green',
      scope:
        'string.quoted.double.fish, punctuation.definition.string.end.fish, punctuation.definition.string.begin.fish, string.quoted.single.fish',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Fish purple',
      scope: 'constant.character.escape.single.fish',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // PowerShell{{{
    {
      name: 'PowerShell grey',
      scope: 'punctuation.definition.variable.powershell',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'PowerShell yellow',
      scope:
        'entity.name.function.powershell, support.function.attribute.powershell, support.function.powershell',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'PowerShell green',
      scope:
        'string.quoted.single.powershell, string.quoted.double.powershell, punctuation.definition.string.begin.powershell, punctuation.definition.string.end.powershell, string.quoted.double.heredoc.powershell',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'PowerShell aqua',
      scope: 'variable.other.member.powershell',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // GraphQL{{{
    {
      name: 'GraphQL white',
      scope: 'string.unquoted.alias.graphql',
      settings: {
        foreground: palette.fg,
      },
    },
    {
      name: 'GraphQL red',
      scope: 'keyword.type.graphql',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'GraphQL purple',
      scope: 'entity.name.fragment.graphql',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'GraphQL grey',
      scope:
        'punctuation.definition.type.graphql, punctuation.separator.graphql',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'GraphQL orange',
      scope: 'keyword.operator.graphql',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'GraphQL green',
      scope: 'entity.name.function.graphql, support.type.field.graphql',
      settings: {
        foreground: palette.green,
      },
    },
    // }}}
    // {{{Makefile
    {
      name: 'Makefile orange',
      scope: 'entity.name.function.target.makefile',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Makefile yellow',
      scope: 'variable.other.makefile',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Makefile green',
      scope: 'meta.scope.prerequisites.makefile',
      settings: {
        foreground: palette.green,
      },
    },
    // }}}
    // {{{CMake
    {
      name: 'CMake grey',
      scope:
        'punctuation.definition.comment.cmake, punctuation.section.arguments.begin.cmake, punctuation.section.arguments.end.cmake, punctuation.separator.arguments.cmake',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'CMake red',
      scope: 'keyword.control.cmake',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'CMake orange',
      scope: 'keyword.operator.assignment.cmake, storage.type.cmake',
      settings: {
        foreground: palette.orange,
        fontStyle: 'italic',
      },
    },
    {
      name: 'CMake yellow',
      scope: 'string.quoted.double.cmake, string.quoted.single.cmake',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'CMake green',
      scope: 'support.function.cmake, entity.name.function.cmake',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'CMake aqua',
      scope: 'variable.language.cmake',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'CMake blue',
      scope: 'variable.other.cmake',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'CMake purple',
      scope: 'constant.language.cmake, constant.numeric.cmake',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // {{{VimL
    {
      name: 'VimL grey',
      scope: 'punctuation.definition.map.viml',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'VimL orange',
      scope: 'storage.type.map.viml',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'VimL green',
      scope: 'constant.character.map.viml, constant.character.map.key.viml',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'VimL blue',
      scope: 'constant.character.map.special.viml',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'VimL red',
      scope:
        'keyword.control.viml, keyword.control.function.viml, keyword.control.call.viml, keyword.control.echo.viml, keyword.control.let.viml, keyword.control.try.viml',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'VimL yellow',
      scope: 'string.quoted.double.viml, string.quoted.single.viml',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'VimL aqua',
      scope:
        'keyword.control.autocmd.viml, keyword.control.augroup.viml, keyword.control.command.viml, keyword.control.highlight.viml, keyword.control.syntax.viml',
      settings: {
        foreground: palette.aqua,
        fontStyle: 'italic',
      },
    },
    {
      name: 'VimL purple',
      scope: 'constant.language.viml, variable.language.viml',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // {{{Tmux
    {
      name: 'Tmux grey',
      scope:
        'punctuation.separator.key-value.tmux, punctuation.definition.string.begin.tmux, punctuation.definition.string.end.tmux',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Tmux red',
      scope: 'keyword.control.tmux, support.function.tmux',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'Tmux orange',
      scope: 'keyword.other.option.tmux, support.constant.option.tmux',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Tmux green',
      scope:
        'constant.language.tmux, constant.numeric.tmux, string.quoted.double.tmux, string.quoted.single.tmux',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Tmux aqua',
      scope: 'entity.name.function.tmux, variable.function.tmux',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Tmux purple',
      scope: 'variable.other.tmux, punctuation.definition.variable.tmux',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // {{{Dockerfile
    {
      name: 'Dockerfile orange',
      scope: 'entity.name.function.package-manager.dockerfile',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Dockerfile yellow',
      scope: 'keyword.operator.flag.dockerfile',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Dockerfile green',
      scope: 'string.quoted.double.dockerfile, string.quoted.single.dockerfile',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Dockerfile aqua',
      scope: 'constant.character.escape.dockerfile',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'Dockerfile purple',
      scope:
        'entity.name.type.base-image.dockerfile, entity.name.image.dockerfile',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // Diff{{{
    {
      name: 'Diff grey',
      scope: 'punctuation.definition.separator.diff',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'Diff red',
      scope: 'markup.deleted.diff, punctuation.definition.deleted.diff',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Diff orange',
      scope: 'meta.diff.range.context, punctuation.definition.range.diff',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Diff yellow',
      scope: 'meta.diff.header.from-file',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'Diff green',
      scope: 'markup.inserted.diff, punctuation.definition.inserted.diff',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Diff blue',
      scope: 'markup.changed.diff, punctuation.definition.changed.diff',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'Diff purple',
      scope: 'punctuation.definition.from-file.diff',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
    // {{{Git
    {
      name: 'Git red',
      scope:
        'entity.name.section.group-title.ini, punctuation.definition.entity.ini',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'Git orange',
      scope: 'punctuation.separator.key-value.ini',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'Git green',
      scope:
        'string.quoted.double.ini, string.quoted.single.ini, punctuation.definition.string.begin.ini, punctuation.definition.string.end.ini',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'Git aqua',
      scope: 'keyword.other.definition.ini',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // SQL{{{
    {
      name: 'SQL red',
      scope:
        'keyword.other.sql, keyword.control.sql, keyword.other.create.sql, keyword.other.drop.sql, keyword.other.alter.sql',
      settings: {
        foreground: palette.red,
        fontStyle: 'italic',
      },
    },
    {
      name: 'SQL yellow',
      scope:
        'support.function.aggregate.sql, support.function.sql, entity.name.function.sql',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'SQL green',
      scope:
        'string.quoted.single.sql, punctuation.definition.string.end.sql, punctuation.definition.string.begin.sql, string.quoted.double.sql',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'SQL aqua',
      scope:
        'support.type.sql, entity.name.table.sql, entity.name.column.sql, constant.other.sql',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'SQL blue',
      scope: 'variable.other.sql, variable.parameter.sql',
      settings: {
        foreground: palette.blue,
      },
    },
    // }}}
    // GraphQL{{{
    {
      name: 'GraphQL yellow',
      scope: 'support.type.graphql',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'GraphQL blue',
      scope: 'variable.parameter.graphql',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'GraphQL aqua',
      scope: 'constant.character.enum.graphql',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // JSON{{{
    {
      name: 'JSON red',
      scope: 'constant.language.json',
      settings: {
        foreground: palette.red,
      },
    },
    {
      name: 'JSON yellow',
      scope: 'string.quoted.double.json',
      settings: {
        foreground: palette.yellow,
      },
    },
    {
      name: 'JSON aqua',
      scope: 'support.type.property-name.json',
      settings: {
        foreground: palette.aqua,
      },
    },
    {
      name: 'JSON blue',
      scope: 'storage.type.json',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'JSON purple',
      scope: 'constant.numeric.json',
      settings: {
        foreground: palette.purple,
      },
    },
    {
      name: 'JSON grey',
      scope:
        'punctuation.support.type.property-name.begin.json, punctuation.support.type.property-name.end.json, punctuation.separator.dictionary.key-value.json, punctuation.definition.string.begin.json, punctuation.definition.string.end.json, punctuation.separator.dictionary.pair.json, punctuation.separator.array.json',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'JSON orange',
      scope: 'support.type.property-name.json',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'JSON green',
      scope: 'string.quoted.double.json',
      settings: {
        foreground: palette.green,
      },
    },
    // }}}
    // YAML{{{
    {
      name: 'YAML grey',
      scope: 'punctuation.separator.key-value.mapping.yaml',
      settings: {
        foreground: palette.grey1,
      },
    },
    {
      name: 'YAML green',
      scope:
        'string.unquoted.plain.out.yaml, string.quoted.single.yaml, string.quoted.double.yaml, punctuation.definition.string.begin.yaml, punctuation.definition.string.end.yaml, string.unquoted.plain.in.yaml, string.unquoted.block.yaml',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'YAML aqua',
      scope:
        'punctuation.definition.anchor.yaml, punctuation.definition.block.sequence.item.yaml',
      settings: {
        foreground: palette.aqua,
      },
    },
    // }}}
    // TOML{{{
    {
      name: 'TOML orange',
      scope: 'keyword.key.toml',
      settings: {
        foreground: palette.orange,
      },
    },
    {
      name: 'TOML green',
      scope:
        'string.quoted.single.basic.line.toml, string.quoted.single.literal.line.toml, punctuation.definition.keyValuePair.toml',
      settings: {
        foreground: palette.green,
      },
    },
    {
      name: 'TOML blue',
      scope: 'constant.other.boolean.toml',
      settings: {
        foreground: palette.blue,
      },
    },
    {
      name: 'TOML purple',
      scope:
        'entity.other.attribute-name.table.toml, punctuation.definition.table.toml, entity.other.attribute-name.table.array.toml, punctuation.definition.table.array.toml',
      settings: {
        foreground: palette.purple,
      },
    },
    // }}}
  ];
  if (italicComments) {
    // {{{
    syntax.push({
      name: 'Comment',
      scope: 'comment, string.comment, punctuation.definition.comment',
      settings: {
        foreground: palette.grey1,
        fontStyle: 'italic',
      },
    }); // }}}
  } else {
    // {{{
    syntax.push({
      name: 'Comment',
      scope: 'comment, string.comment, punctuation.definition.comment',
      settings: {
        foreground: palette.grey1,
      },
    });
  } // }}}
  return syntax;
}

// vim: fdm=marker fmr={{{,}}}:
